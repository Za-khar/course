const nodemailer = require('nodemailer');
const config = require('../Config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get('MAIL_ADDRESS'),
        pass: config.get('MAIL_PASS'),
    }
});

const mailer = (message) => {
    transporter.sendMail(message, (err, info) => {
        if(err){
            return console.log('Email error: ', err);
        }
        console.log(info);
    });
}

module.exports = mailer;