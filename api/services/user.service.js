const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Friend = require('../models/Friend')
const config = require('../Config')
const fs = require('fs').promises
const ApiError = require('../utils/ApiError')

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

const getOneUser = async (current_user_id, search_user_id) => {
  const searchUser = await User.getUserById(search_user_id)

  if (!searchUser || (searchUser && searchUser.active === false)) {
    throw new ApiError('404', 'User is not found')
  }

  const friend = await Friend.isFriend(current_user_id, search_user_id)
  const avatar = await User.getAvatar(search_user_id)

  const accessData = {
    email: searchUser.email,
    phone_number: searchUser.phone_number,
  }

  for (let prop in accessData) {
    accessData[prop] =
      searchUser[`show_${prop}`] === 'all'
        ? searchUser[prop]
        : searchUser[`show_${prop}`] === 'friends' && friend?.is_friend
        ? searchUser[prop]
        : `Information about ${prop} is hidden`
  }

  const {
    password,
    role,
    show_phone_number,
    show_educational_institution,
    show_email,
    email,
    phone_number,
    ...mainData
  } = searchUser

  return { ...accessData, ...mainData, ...avatar }
}

module.exports = {
  createUser,
  getOneUser,
  updateUser,
}
