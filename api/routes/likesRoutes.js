const express = require('express')
const db = require('../services/db')
const { route } = require('./postsRoutes')
const validator = require('../middleware/validator')
const router = express.Router()
const LikesController = require('../controllers/likesController')

const { checkAuthorized, checkActivation } = require('../middleware/acl')

router.get('/:id', [checkAuthorized, checkActivation], LikesController.getLikes)

module.exports = router
