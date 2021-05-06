const express = require('express')
const router = express.Router()
const { checkAuthorized, checkActivation } = require('../middleware/acl')
const UserController = require('../controllers/userController')
const validator = require('../middleware/validator')

router.put(
  '/',
  [
    checkAuthorized,
    validator({
      first_name: ['required', 'min:1', 'max:20'],
      last_name: ['required', 'min:1', 'max:20'],
      email: ['required', 'email', 'unique:Users:email:update:user_id'],
      phone_number: ['min:12', 'max:12'],
      show_email: ['required', 'oneOf:all:friends:me'],
      show_phone_number: ['oneOf:all:friends:me'],
      show_educational_institution: ['oneOf:all:friends:me'],
    }),
  ],
  UserController.updateOneUser
)

router.get(
  '/:id',
  [checkAuthorized, checkActivation],
  UserController.getOneUser
)

module.exports = router
