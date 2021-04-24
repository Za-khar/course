const express = require('express')
const db = require('../services/db')
const { route } = require('./postsRoutes')
const validator = require('../middleware/validator')
const router = express.Router()
const LikesController = require('../controllers/likesController')

const { checkAuthorized, chackActivation } = require('../middleware/acl')

router.get('/:id', [checkAuthorized, chackActivation], LikesController.getLikes)

module.exports = router
