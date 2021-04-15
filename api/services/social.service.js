const config = require('../Config')
const User = require('../models/User')
const { userService } = require('../services')
const bcrypt = require('bcryptjs')
const ApiError = require('../utils/ApiError')

const createUserBySocialAccount = async (socData) => {
  const { id, email, _provider } = socData

  const socAcc = await User.getSocialAccountByEmail({
    email,
    provider: _provider,
  })

  if (socAcc) {
    throw new ApiError(401, `Social account is already exist`)
  }

  const hashPassword = await bcrypt.hash(id, 4)
  socData.password = hashPassword
  const userData = await userService.createUser(socData)

  await User.saveSocialAccout({
    accountID: id,
    socialAccoutEmail: email,
    userID: userData.user_id,
    provider: _provider,
  })

  await User.activate(userData.user_id)
  userData.active = true

  return userData
}

const linkSocialAccount = async ({ user_id, _provider, email, id }) => {
  const ownAcc = await User.getSocialAccountByUserID({
    id: user_id,
    _provider,
  })

  if (ownAcc) {
    throw new ApiError(401, `You are already linked with ${provider} account`)
  }

  return await User.saveSocialAccout({
    accountID: id,
    socialAccoutEmail: email,
    userID: user_id,
    provider: _provider,
  })
}

module.exports = {
  createUserBySocialAccount,
  linkSocialAccount,
}
