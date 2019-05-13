'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');
// const global = require('../GLOBAL');
module.exports = function (req, res, next) {
  if (!req.headers.authorization){
    return res.status(403).send({ok: false, msg: 'No estas enviando token de autorizacion'});
  }
  const token = req.headers.authorization.replace(/['"]+/g, '');
  var payload;
  try {
    payload = jwt.decode(token, sails.config.models.dataEncryptionKeys.default);
    // console.log('payload', payload);
    if (payload.exp <= moment().unix()){
      return res.status(403).send({ok: false, msg: 'El token ha expirado'});
    }
  }catch(ex) {
    return res.status(403).send({ok: false, msg: 'El token no es valido', err: ex});
  }
  req.user = payload;
  next();
};
