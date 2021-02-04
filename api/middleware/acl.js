const db = require('../services/db');

function checkAuthorized(req, res, next) {
  if (req.user) {
    next();
  }
  else {
    res.status(401).send({message: 'Access denied'});
  }
}

function checkAccess(table, column, columnIDName){
  return async function (req, res, next){

    const creator = await db.select(column).from(table).where(columnIDName, req.params.id).first();

      if (creator && req.user && req.user.id == creator[column]) {
        next();
      } else {
        res.status(401).send({message: 'Access denied'});
      }
  }
}

  module.exports = {
    checkAuthorized,
    checkAccess,
  };
