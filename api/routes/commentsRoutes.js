const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')
const {
  checkAuthorized,
  checkAccess,
  chackActivation,
} = require('../middleware/acl')

router.get(
  '/:id',
  [checkAuthorized, chackActivation],
  commentsController.getComments
)

module.exports = router
