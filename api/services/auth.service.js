const User = require('../models/User')
const Token = require('../models/Token')
const config = require('../Config')
const bcrypt = require('bcryptjs')
const ApiError = require('../utils/ApiError')
const tokenService = require('./token.service')

const loginWithEmailAndPassword = async ({ email, password }) => {
  const user = await User.findByLogin(email)

  const isPassValid = await bcrypt.compare(password, user.password)

  if (!isPassValid) {
    throw new ApiError(400, 'Invalid password')
  }

  return user
}

const loginWithSocialAccount = async (id) => {
  const user = await User.getUserBySocialAccountID(id)

  if (user) {
    return user
  } else {
    throw new ApiError(400, 'Social account does not exist')
  }
}

const logoutUser = async (refreshToken) => {
  const tokenData = await tokenService.verifyRefreshToken(refreshToken)
  await Token.deleteRefreshToken({
    refreshToken,
    user_id: tokenData.user_id,
  })
}

const refreshAuth = async ({ refreshToken }) => {
  const refreshTokenData = await tokenService.verifyRefreshToken(refreshToken)
  const userData = await User.getUserById(refreshTokenData.user_id)

  if (!userData) {
    throw new Error()
  }

  await Token.deleteRefreshToken({ refreshToken, user_id: userData.user_id })

  const authTokens = await tokenService.generateAuthTokens(userData)

  const { password, ...user } = userData

  return {
    user,
    authTokens,
  }
}

module.exports = {
  loginWithEmailAndPassword,
  refreshAuth,
  loginWithSocialAccount,
  logoutUser,
}
