const express = require('express');
const router = require('express').Router();
const config = require('../Config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const mailer = require('../services/nodemailer');

router.get('/login', (req, res) => {
    res.send('Good!');
});

router.post('/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password','Password must be longer than 6 and shorter than 20').isLength({min: 6, max: 12}),
    ],
    async function (req, res) {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({message: 'Uncorrect request', errors});
        }

        const {email, password} = req.body;

        const candidate = await User.findByLogin(email);

        if(candidate){
            return res.status(400).json({message: `User with username ${email} already exist`});
        }

        const hashPassword = await bcrypt.hash(password, 4);

        const newUser = (await User.saveUser({email, hashPassword}))[0];

        const emailToken = jwt.sign({id: newUser.id}, config.get('MAIL_SECRET'), {expiresIn: '1h'});

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
                id: newUser.id,
                email: newUser.email,
            },
            message: 'You are registered! Verify your email!'
        });

    } catch(e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
});

router.get('/auth', async function(req, res) {
    try{
        const user = await User.findOne(req.user.id);

        const token = jwt.sign({id: user.id}, config.get('SECRET_KEY'), {expiresIn: '1h'});

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
            }
        });

    } catch(e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
});

router.post('/login', async function(req, res) {
    try{
        const {email, password} = req.body;

        const user = await User.findByLogin(email);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        if (!user.active) {
            return res.status(400).json('User not verify');
          }

        const isPassValid = bcrypt.compareSync(password, user.password);

        if(!isPassValid){
            return res.status(400).json({message: 'Invalid password'});
        }

        const token = jwt.sign({id: user.id}, config.get('SECRET_KEY'), {expiresIn: '1h'});

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
            }
        });
    } catch(e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
});

router.get('/confirmation/:token', async (req, res) => {
    try{
        const {id} = jwt.verify(req.params.token, config.get('MAIL_SECRET'));

        const { active } = await User.checkActive(id);

        if(active){
            return res.status(400).json({message: 'User is activated'});
        }
        
        await User.activate(id);  
        
        return res.redirect(`http://${config.get('HOST')}:${config.get('PORT')}/auth/login`);

    } catch(e){
        console.log(e);
        res.send('error');
    }

});

module.exports = router;