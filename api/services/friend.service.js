const Friend = require('../models/Friend')
const ApiError = require('../utils/ApiError')

async function getFriends(user_id) {
  const checkUser = await Friend.checkUser(user_id)

  if (!checkUser) {
    throw new ApiError(401, 'User does not exist!')
  }

  return await Friend.getFriendsByUserId(user_id)
}

async function getIncomingRequests(user_id) {
  const checkUser = await Friend.checkUser(user_id)

  if (!checkUser) {
    throw new ApiError(401, 'User does not exist!')
  }

  return await Friend.getIncomingRequestsByUserId(user_id)
}

async function getOutgoingRequests(user_id) {
  const checkUser = await Friend.checkUser(user_id)

  if (!checkUser) {
    throw new ApiError(401, 'User does not exist!')
  }

  return await Friend.getOutgoingRequestsByUserId(user_id)
}

async function sendFriendRequest(user_id, friend_id) {
  if (user_id.toString() === friend_id.toString()) {
    throw new ApiError(401, 'You cannot send a friend request to yourself!')
  }

  const checkOwnRequest = await Friend.checkRequest(user_id, friend_id)

  if (checkOwnRequest) {
    throw new ApiError(401, 'You already sent request!')
  }

  const checkFriendRequest = await Friend.checkRequest(friend_id, user_id)

  if (checkFriendRequest) {
    throw new ApiError(401, 'Incoming friend request exists please confirm it')
  }

  const date = new Date()
  await Friend.addRequest(user_id, friend_id, false, date)
}

async function cancelFriendRequest(user_id, friend_id) {
  const checkOwnRequest = await Friend.checkRequest(user_id, friend_id)

  if (!checkOwnRequest) {
    throw new ApiError(401, 'You have not sent a friend request!')
  }

  await Friend.deleteRequest(user_id, friend_id)
}

async function confirmFriendRequest(user_id, friend_id) {
  const checkRequest = await Friend.checkRequest(friend_id, user_id)

  if (!checkRequest) {
    throw new ApiError(401, 'Request does not exist!')
  }

  const checkOwnRequest = await Friend.checkRequest(user_id, friend_id)

  if (checkOwnRequest) {
    throw new ApiError(401, 'Request has already been confirmed!')
  }

  const date = new Date()

  await Friend.addRequest(user_id, friend_id, true, date)
  await Friend.updateRequest(friend_id, user_id, true, date)
}

async function rejectFriendRequest(user_id, friend_id) {
  const checkRequest = await Friend.checkRequest(friend_id, user_id)

  if (!checkRequest) {
    throw new ApiError(401, 'Request does not exist!')
  }

  const checkOwnRequest = await Friend.checkRequest(user_id, friend_id)

  if (checkOwnRequest) {
    throw new ApiError(401, 'Request has already been confirmed!')
  }

  await Friend.deleteRequest(friend_id, user_id)
}

async function deleteFriend(user_id, friend_id) {
  const checkRequest = await Friend.checkRequest(friend_id, user_id)
  const checkOwnRequest = await Friend.checkRequest(user_id, friend_id)

  if (!(checkRequest && checkOwnRequest)) {
    throw new ApiError(401, 'This user is not a friend!')
  }

  const date = new Date()

  await Friend.deleteRequest(user_id, friend_id)
  await Friend.updateRequest(friend_id, user_id, false, date)
}

async function searchUser(searchField, user_id) {
  return await Friend.searchUserByName(searchField, user_id)
}

module.exports = {
  sendFriendRequest,
  getOutgoingRequests,
  getIncomingRequests,
  deleteFriend,
  searchUser,
  getFriends,
  rejectFriendRequest,
  confirmFriendRequest,
  cancelFriendRequest,
}
