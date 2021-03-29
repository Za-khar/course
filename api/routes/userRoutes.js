const express = require('express')
const db = require('../services/db')
const router = express.Router()
const { checkAuthorized } = require('../middleware/acl')

router.get('/', [checkAuthorized], async (req, res) => {
  const userData = await db('Users')
    .select(
      'email',
      'first_name',
      'last_name',
      'phone_number',
      'path',
      'show_phone_number',
      'show_email',
      'show_educational_institution'
    )
    .leftJoin('Avatars', function () {
      this.on('Users.user_id', '=', 'Avatars.user_id')
    })
    .leftJoin('User_settings', function () {
      this.on('Users.user_id', '=', 'User_settings.user_id')
    })
    .first()

  res.json(userData)
})

router.put('/', [checkAuthorized], async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    show_educational_institution,
    show_phone_number,
    show_email,
  } = req.body
  await db('User_settings').update({
    show_email: show_email,
    show_phone_number: show_phone_number,
    show_educational_institution: show_educational_institution,
  })
  const userData = await db('Users')
    .update({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
    })
    .returning('*')

  res.json(userData)
})

module.exports = router
