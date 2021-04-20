const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')
const { checkAuthorized, chackActivation } = require('../middleware/acl')

router.post(
  '/upload-avatar',
  [checkAuthorized, chackActivation],
  fileController.uploadAvatar
)

router.get(
  '/avatar',
  [checkAuthorized, chackActivation],
  fileController.getAvatar
)

router.delete(
  '/delete-avatar',
  [checkAuthorized, chackActivation],
  fileController.deleteAvatar
)

module.exports = router
