'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');
// const global = require('../GLOBAL');
exports.createToken = function (user) {
  //console.log('esto es el jwt', user);
  let payload = {
    id: user.id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    state: user.state,
    emailVerify: user.emailVerify,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  };
  return jwt.encode(payload, sails.config.models.dataEncryptionKeys.default,null, null);
};
