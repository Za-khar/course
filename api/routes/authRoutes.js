const express = require('express');
const router = require('express').Router();
const config = require('../Config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../services/nodemailer');
const validator = require('../middleware/validator');

const authController = require('../controllers/authController');

const { checkSocialAccount } = require('../middleware/acl');

const facebookUrl = 'https://graph.facebook.com/me?fields=name,id,email';
const googleUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';

router.get('/login', (req, res) => {
    res.send('Good!');
});

router.post('/registration',
    validator({
        email: ['required', 'email', 'unique:Users:email'],
        password: ['required', 'min:8', 'max:25']
    }),
    async function (req, res) {
        try {
            const { email, password } = req.body;

            const hashPassword = await bcrypt.hash(password, 4);

            const userRole = 'user';

            const newUser = (await User.saveUser({ email, hashPassword, userRole }))[0];

            const emailToken = jwt.sign({ user_id: newUser.user_id }, config.get('MAIL_SECRET'), { expiresIn: '1h' });

            const url = `http://${config.get('HOST')}:${config.get('PORT')}/auth/confirmation/${emailToken}`;

            const message = {
                from: config.get('MAIL_ADDRESS'),
                to: email,
                subject: 'Confirm Email',
                html: `
            <p>Please, click this link to confirm your email:</p>
            <a href="${url}">${url}</a>
            `,
            }
            mailer(message);

            return res.json({
                newUser: {
                    user_id: newUser.user_id,
                    email: newUser.email,
                },
                message: 'You are registered! Verify your email!'
            });

        } catch (e) {
            console.log(e);
            res.status(500).send({ message: 'Server error' });
        }
    });

router.get('/auth', async function (req, res) {
    try {
        const user = await User.findOne(req.user.user_id);

        const token = jwt.sign({ id: user.user_id }, config.get('SECRET_KEY'), { expiresIn: '1h' });

        return res.json({
            token,
            user: {
                user_id: user.user_id,
                email: user.email,
            }
        });

    } catch (e) {
        console.log(e);
        res.send({ message: 'Server error' });
    }
});

router.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findByLogin(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.active) {
            return res.status(401).json('User not verify');
        }

        const isPassValid = bcrypt.compareSync(password, user.password);

        if (!isPassValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ user_id: user.user_id }, config.get('SECRET_KEY'), { expiresIn: '1h' });

        return res.json({
            token,
            user: {
                user_id: user.user_id,
                email: user.email,
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Server error' });
    }
});

router.get('/confirmation/:token', async (req, res) => {
    try {
        const { user_id } = jwt.verify(req.params.token, config.get('MAIL_SECRET'));

        const { active } = await User.checkActive(user_id);

        if (active) {
            return res.status(400).json({ message: 'User is activated' });
        }

        await User.activate(user_id);

        return res.redirect(`http://${config.get('HOST')}:${config.get('PORT')}/auth/login`);

    } catch (e) {
        console.log(e);
        res.status(500).send('server error');
    }

});

router.post('/social/google', [checkSocialAccount(googleUrl)], authController.socialLogin);

router.post('/social/facebook', [checkSocialAccount(facebookUrl)], authController.socialLogin);

module.exports = router;