const bcrypt = require('bcryptjs')
const User = require('../models/User')
const config = require('../Config')
const fs = require('fs').promises

const createUser = async ({
  email,
  password,
  firstName = 'No',
  lastName = 'Name',
}) => {
  const hashPassword = await bcrypt.hash(password, 4)
  const newUser = (
    await User.saveUser({ email, hashPassword, firstName, lastName })
  )[0]
  const userSettings = (await User.saveUserSettings(newUser.user_id))[0]
  await fs.mkdir(`${config.get('FILE_PATH')}\\files\\${newUser.user_id}`)
  return {
    ...newUser,
    ...userSettings,
  }
}

const updateUser = async ({ data, user_id }) => {
  const userData = (await User.updateUserData(data, user_id))[0]
  const userSettings = (await User.updateUserSettings(data, user_id))[0]
  return {
    ...userData,
    ...userSettings,
  }
}

module.exports = {
  createUser,
  updateUser,
}
