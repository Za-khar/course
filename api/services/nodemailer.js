const nodemailer = require('nodemailer');
const config = require('../Config');

const transporter = nodemailer.createTransport({
    host: config.get('MAIL_HOST'),
    port: config.get('MAIL_PORT'),
    secure: false,
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