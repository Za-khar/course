const jwt = require('jsonwebtoken');
const config = require('../Config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.get('SECRET_KEY'));
      req.user = decoded;

      const { role } = await User.getRoleByID(req.user.id);

      req.user.permissions = config.getPermissionsByRole(role);
    } catch (e) {
      console.log(e);
    }

    next();
}

