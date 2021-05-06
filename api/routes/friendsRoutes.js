const express = require('express')
const router = express.Router()
const friendsController = require('../controllers/friendsController')
const {
  checkAuthorized,
  checkActivation,
  checkFriend,
} = require('../middleware/acl')

router.get(
  '/:id',
  [checkAuthorized, checkActivation, checkFriend],
  friendsController.getFriends
)

router.get(
  '/search/:name',
  [checkAuthorized, checkActivation],
  friendsController.searchUser
)

router.get(
  '/incoming-requests/:id',
  [checkAuthorized, checkActivation, checkFriend],
  friendsController.getIncomingRequests
)

router.get(
  '/outgoing-requests/:id',
  [checkAuthorized, checkActivation, checkFriend],
  friendsController.getOutgoingRequests
)

router.post(
  '/send-request',
  [checkAuthorized, checkActivation, checkFriend],
  friendsController.sendFriendRequest
)

router.delete(
  '/cancel-request',
  [checkAuthorized, checkActivation, checkFriend],
  friendsController.cancelFriendRequest
)

router.post(
  '/confirm-request',
  [checkAuthorized, checkActivation, checkFriend],
  friendsController.confirmFriendRequest
)

router.delete(
  '/',
  [checkAuthorized, checkActivation, checkFriend],
  friendsController.deleteFriend
)

router.delete(
  '/reject-request',
  [checkAuthorized, checkActivation, checkFriend],
  friendsController.rejectFriendRequest
)

module.exports = router
