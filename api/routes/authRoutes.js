const router = require('express').Router()

const validator = require('../middleware/validator')

const authController = require('../controllers/authController')

const {
  checkSocialAccount,
  checkRegistrationByLogin,
} = require('../middleware/acl')

router.post(
  '/registration',
  validator({
    email: ['required', 'email', 'unique:Users:email'],
    password: ['required', 'min:8', 'max:25'],
  }),
  authController.simpleRegistaration
)

router.post('/login', [checkRegistrationByLogin], authController.simpleLogin)

router.get('/confirmation/:token', authController.userActivation)

router.post('/refresh-auth', authController.refreshLogin)

router.post('/logout', authController.logout)

router.post('/social-login', [checkSocialAccount], authController.socialLogin)

router.post(
  '/social-reg',
  [
    checkSocialAccount,
    validator({
      email: ['required', 'email', 'unique:Users:email'],
    }),
  ],
  authController.socialRegistration
)

module.exports = router
