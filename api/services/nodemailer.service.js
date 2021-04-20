const nodemailer = require('nodemailer')
const config = require('../Config')
const tokenService = require('./token.service')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get('MAIL_ADDRESS'),
    pass: config.get('MAIL_PASS'),
  },
})

const mailer = (message) => {
  const msg = { from: config.get('MAIL_ADDRESS'), ...message }
  transporter.sendMail(msg, (err, info) => {
    if (err) {
      return console.log('Email error: ', err)
    }
    console.log(info)
  })
}

const sendActivationMessage = async (userData) => {
  const emailToken = await tokenService.generateMailToken(userData)

  const url = `http://${config.get('HOST')}:${config.get(
    'PORT'
  )}/auth/confirmation/${emailToken}`

  const message = {
    to: userData.email,
    subject: 'Confirm Email',
    html: `
        <p>Please, click this link to confirm your email:</p>
        <a href="${url}">${url}</a>
        `,
  }

  mailer(message)
}

module.exports = {
  mailer,
  sendActivationMessage,
}
