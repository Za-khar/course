const jwt = require('jsonwebtoken');
const config = require('../Config');

module.exports = (req, res, next) => {
  try{
    if (req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).send('Auth error!');
    }

    const decoded = jwt.verify(token, config.get('SECRET_KEY'));

    req.user = decoded;
  }

  next();

  } catch(e){
    console.log(e);
    res.send({message: 'Server error'});
  }
}