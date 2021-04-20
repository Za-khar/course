const express = require('express')
const router = require('express').Router()

const validator = require('../middleware/validator')
const config = require('../Config')

const socialController = require('../controllers/socialController')

const {
  checkSocialAccount,
  checkAuthorized,
  chackActivation,
} = require('../middleware/acl')

router.post(
  '/google-link',
  [
    checkAuthorized,
    chackActivation,
    checkSocialAccount,
    validator({
      email: [
        'required',
        'email',
        'unique:Users:email',
        'unique:Social_accounts:social_email:where:provider:google',
      ],
    }),
  ],
  socialController.linkAccount
)

router.post(
  '/facebook-link',
  [
    checkAuthorized,
    chackActivation,
    checkSocialAccount,
    validator({
      email: [
        'required',
        'email',
        'unique:Users:email',
        'unique:Social_accounts:social_email:where:provider:facebook',
      ],
    }),
  ],
  socialController.linkAccount
)

module.exports = router
