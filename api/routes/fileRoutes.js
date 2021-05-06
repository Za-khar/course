const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')
const { checkAuthorized, checkActivation } = require('../middleware/acl')

router.post(
  '/upload-avatar',
  [checkAuthorized, checkActivation],
  fileController.uploadAvatar
)

router.get(
  '/avatar',
  [checkAuthorized, checkActivation],
  fileController.getAvatar
)

router.delete(
  '/delete-avatar',
  [checkAuthorized, checkActivation],
  fileController.deleteAvatar
)

module.exports = router
