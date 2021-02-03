function checkAuthorized(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.send({message: 'Access denied'});
    }
  }
  
  module.exports = {
    checkAuthorized,
  };
  