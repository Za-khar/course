const moment = require('moment')
const config = require('../Config')
const Token = require('../models/Token')
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError')

const generateToken = (user_id, expires, secret = config.get('SECRET_KEY')) => {
  const payload = {
    sub: user_id,
    iat: moment().unix(),
    exp: expires.unix(),
  }
  return jwt.sign(payload, secret)
}

const saveToken = async (refreshToken, user_id, expires) => {
  const tokenData = await Token.saveRefreshToken({
    refreshToken,
    user_id,
    expires: expires.toDate(),
  })
  return tokenData
}

const generateAuthTokens = async ({ user_id }) => {
  const accessTokenExpires = moment().add(
    config.get('ACCESS_EXPIRATION'),
    'minutes'
  )
  const accessToken = generateToken(user_id, accessTokenExpires)

  const refreshTokenExpires = moment().add(
    config.get('REFRESH_EXPIRATION'),
    'days'
  )
  const refreshToken = generateToken(user_id, refreshTokenExpires)
  await saveToken(refreshToken, user_id, refreshTokenExpires)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  }
}

const verifyRefreshToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, config.get('SECRET_KEY'))
  const tokenData = await Token.findRefreshToken({
    refreshToken,
    user_id: payload.sub,
  })
  if (!tokenData) {
    throw new ApiError(404, 'Not found')
  }
  return tokenData
}

const generateMailToken = ({ user_id }) => {
  const mailTokenExpires = moment().add(
    config.get('MAIL_EXPIRATION'),
    'minutes'
  )
  const mailToken = generateToken(
    user_id,
    mailTokenExpires,
    config.get('MAIL_SECRET')
  )
  return mailToken
}

module.exports = {
  generateAuthTokens,
  generateToken,
  saveToken,
  generateMailToken,
  verifyRefreshToken,
}
