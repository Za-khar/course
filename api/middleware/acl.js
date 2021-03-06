const db = require('../services/db')
const config = require('../Config')
const Friend = require('../models/Friend')
const User = require('../models/User')
const axios = require('axios')

function checkAuthorized(req, res, next) {
  if (req.user) {
    return next()
  } else {
    return res.status(401).send({ message: 'Access denied' })
  }
}

async function checkFriend(req, res, next) {
  let checkFriend
  if (req.body.user_id) {
    checkFriend = await Friend.checkUser(req.body.user_id)
  }

  if (req.params.id) {
    checkFriend = await Friend.checkUser(req.params.id)
  }

  if (!checkFriend) {
    return res.status(401).send({ message: 'User does not exist!' })
  }

  return next()
}

async function checkRegistrationByLogin(req, res, next) {
  try {
    const user = await User.findByLogin(req.body.email)

    if (!user) {
      return res
        .status(404)
        .send({ message: 'User with such mail does not exist' })
    }

    return next()
  } catch (e) {
    console.log(e)
    return res.status(500).send({ message: 'Server error' })
  }
}

async function checkActivation(req, res, next) {
  try {
    const user = await User.getUserById(req.user.user_id)
    if (!user.active) {
      return res.status(401).send({ message: 'User not verify' })
    }
    return next()
  } catch (e) {
    console.log(e)
    return res.status(500).send({ message: 'Server error' })
  }
}

function checkAccess(params) {
  return async function (req, res, next) {
    const userPermissions = req.user.permissions

    for (element of params) {
      if (userPermissions.includes(element.permission)) {
        if (element.own) {
          const { table, column, columnIDName } = element.own

          const creator = await db
            .select(column)
            .from(table)
            .where(columnIDName, req.params.id)
            .first()

          if (creator && req.user && req.user.user_id == creator[column]) {
            return next()
          } else {
            return res.status(401).send({ message: 'Access denied' })
          }
        } else {
          return next()
        }
      }
    }
    return res.status(401).send({ message: 'Access denied' })
  }
}

async function checkAccessWS(params, user, current_id) {
  try {
    const userPermissions = user.permissions

    for (element of params) {
      if (userPermissions.includes(element.permission)) {
        if (element.own) {
          const { table, column, columnIDName } = element.own

          const creator = await db
            .select(column)
            .from(table)
            .where(columnIDName, current_id)
            .first()

          if (creator && user && user.user_id == creator[column]) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }
    }
    return false
  } catch (e) {
    console.log(e)
    return false
  }
}

async function checkSocialAccount(req, res, next) {
  const {
    _token: { accessToken },
    _profile: { id: user_id, email: user_email },
    _provider,
  } = req.body

  let url

  switch (_provider) {
    case 'google':
      url = config.get('GOOGLE_URL')
      break
    case 'facebook':
      url = config.get('FACEBOOK_URL')
      break
    default:
      res.status(401).send({ message: 'Undefined social account' })
  }
  axios
    .get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'json',
    })
    .then(async (response) => {
      const {
        data: { email, id, sub },
      } = response

      const uid = id || sub

      for (let prop in req.body._profile) {
        req.body[prop] = req.body._profile[prop]
      }

      if (uid && uid === user_id && email === user_email) {
        next()
      } else {
        res.status(401).send({ message: 'Social auth error!' })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(401).send({ message: 'Access denied' })
    })
}

module.exports = {
  checkAuthorized,
  checkAccess,
  checkSocialAccount,
  checkFriend,
  checkActivation,
  checkRegistrationByLogin,
  checkAccessWS,
}
