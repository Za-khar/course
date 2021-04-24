const jwt = require('jsonwebtoken')
const config = require('../Config')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, config.get('SECRET_KEY'))
      req.user = { user_id: decoded.sub }
      const { role } = await User.getRoleByID(req.user.user_id)
      req.user.permissions = config.getPermissionsByRole(role)
    }
  } catch (e) {
    console.log(e)
  }
  return next()
}

async function authMiddlewareWS(ws, accessToken) {
  try {
    const decoded = jwt.verify(accessToken.token, config.get('SECRET_KEY'))
    const user = { user_id: decoded.sub }
    const { role } = await User.getRoleByID(user.user_id)
    user.permissions = config.getPermissionsByRole(role)
    return user
  } catch (e) {
    console.log(e)
    ws.close()
  }
}

module.exports = {
  authMiddleware,
  authMiddlewareWS,
}
