const jwt = require('jsonwebtoken');
const config = require('../Config');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try{
    if (req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).send('Auth error!');
    }

    const decoded = jwt.verify(token, config.get('SECRET_KEY'));

    req.user = decoded;
    
    const { role } = await User.getRoleByID(req.user.id);
    
    req.user.permissions = config.getPermissionsByRole(role);;
  }

  next();

  } catch(e){
    console.log(e);
    return res.status(401).send({message: 'Access denied'});
  }
}