const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')
const { checkAuthorized, checkActivation } = require('../middleware/acl')

router.get(
  '/:id',
  [checkAuthorized, checkActivation],
  commentsController.getComments
)

module.exports = router
