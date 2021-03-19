const db = require('../services/db');
const config = require('../Config');
const axios = require('axios');

function checkAuthorized(req, res, next) {
  if (req.user) {
    next();
  }
  else {
    res.status(401).send({ message: 'Access denied' });
  }
}

function checkAccess(params) {
  return async function (req, res, next) {

    const userPermissions = req.user.permissions;

    for (element of params) {
      if (userPermissions.includes(element.permission)) {

        if (element.own) {
          const { table, column, columnIDName } = element.own;
          
          const creator = await db.select(column).from(table).where(columnIDName, req.params.id).first();

          if (creator && req.user && req.user.user_id == creator[column]) {
            return next();
          } else {
            return res.status(401).send({ message: 'Access denied' });
          }
        }
        else {
          return next();
        }
      }
    }
    return res.status(401).send({ message: 'Access denied' });
  }
}

function checkSocialAccount(url) {
  return async function (req, res, next) {
    const { _token: { accessToken }, _provider } = req.body;

    axios
      .get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'json',
      })
      .then(async (response) => {

        const { data: { email, id, sub } } = response;

        if (id) {
          req.data = { email, user_id: id, provider: _provider };
        }
        if (sub) {
          req.data = { email, user_id: sub, provider: _provider };
        }

        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send({ message: 'Access denied' });
      });
  }
}

module.exports = {
  checkAuthorized,
  checkAccess,
  checkSocialAccount,
};
