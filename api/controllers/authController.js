const config = require('../Config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    async socialLogin(req, res) {
        try {
            const { email, user_id, provider } = req.data;
            // For logged users
            if (req.user) {

                const socAcc = await User.getSocialAccountByID({ user_id, provider });
                const ownAcc = await User.getSocialAccountByUserID({ id: req.user.user_id, provider });

                if (socAcc) {
                    return res.status(401).send({ message: `This account is already linked` });
                }

                if (ownAcc) {
                    return res.status(401).send({ message: `You are already linked with ${provider} account` });
                }


                await User.saveSocialAccout({ accountID: user_id, socialAccoutEmail: email, userID: req.user.user_id, provider });
                return res.send({ message: `Account linked successful` });
            }

            const user = await User.getUserBySocialAccountID(user_id);

            if (user) {
                // Log in with social account

                const token = jwt.sign({ user_id: user.user_id }, config.get('SECRET_KEY'), { expiresIn: '24h' });

                return res.json({
                    token,
                    user: {
                        user_id: user.user_id,
                        email: user.email,
                    }
                });
            } else {

                const user = await User.findByLogin(email);
                const socAcc = await User.getSocialAccountByID({ user_id, provider });

                // find and link account by email
                if (user && !socAcc) {
                    const ownAcc = await User.getSocialAccountByUserID({ id: user.user_id, provider });
                    if (!ownAcc) {
                        await User.saveSocialAccout({ accountID: user_id, socialAccoutEmail: email, userID: user.user_id, provider });

                        const token = jwt.sign({ user_id: user.user_id }, config.get('SECRET_KEY'), { expiresIn: '1h' });

                        return res.json({
                            token,
                            user: {
                                user_id: user.user_id,
                                email: user.email,
                            }
                        });
                    }

                    return res.status(401).send({ message: `Impossible to link account because user with this email is already associated with ${provider} social account` });
                }

                // registration new user
                if (!socAcc && !user) {
                    const userRole = 'user';
                    const hashPassword = await bcrypt.hash(user_id, 4);

                    const newUser = (await User.saveUser({ email, hashPassword, userRole }))[0];
                    await User.activate(newUser.user_id);

                    const token = jwt.sign({ user_id: newUser.user_id }, config.get('SECRET_KEY'), { expiresIn: '1h' });

                    await User.saveSocialAccout({ accountID: user_id, socialAccoutEmail: email, userID: newUser.user_id, provider });

                    return res.json({
                        token,
                        newUser: {
                            user_id: newUser.user_id,
                            email: newUser.email,
                        },
                    });
                }

                return res.status(401).send({ message: 'Impossible to create account because email already linked' });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: 'Server error' });
        }
    }
}


module.exports = new AuthController();