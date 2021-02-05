const db = require('../services/db');
const config = require('../Config');

function checkAuthorized(req, res, next) {
  if (req.user) {
    next();
  }
  else {
    res.status(401).send({message: 'Access denied'});
  }
}

function checkAccess(params){
  return async function (req, res, next){

    const userPermissions = req.user.permissions;
    
    for(element of params){
      if(userPermissions.includes(element.permission)){

        if(element.own){
          const {table, column, columnIDName} = element.own;

          const creator = await db.select(column).from(table).where(columnIDName, req.params.id).first();

          if (creator && req.user && req.user.id == creator[column]) {
            return next();
          } else {
            return res.status(401).send({message: 'Access denied'});
          }
        }
        else {
          return next();
        }
      }
    }
    return res.status(401).send({message: 'Access denied'});
  }
}

  module.exports = {
    checkAuthorized,
    checkAccess,
  };
