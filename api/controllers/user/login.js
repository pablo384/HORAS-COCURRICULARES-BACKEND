/* eslint-disable handle-callback-err */
'use strict';
var bcrypt = require('bcrypt');
const jwt = require('../../services/jwt');
module.exports = {

  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    nick: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    console.log('LOGION');

    var us = await User.findOne({ or: [{ nick: inputs.nick }, { email: inputs.nick },] });
    // const config = await Config.find({});
    if (us && us.estado === 'A') {
      bcrypt.compare(inputs.password, us.password, (err, res) => {
        us.password = undefined;
        if (res) {
          const token = jwt.createToken(us);
          // us.emailVerify = undefined;
          // us.tokenEmailVerify = undefined;
          us.state = undefined;
          us.id = undefined;
          us.createdAt = undefined;
          us.updatedAt = undefined;
          return exits.success({ error: false, user: us, token: token, message: 'Correcto' });
        } else {
          return this.res.status(500).json({
            error: true,
            status: 401, message: 'Clave incorrecta'
          });
        }
      });
    } else {

      return this.res.status(500).json({
        error: true,
        status: 401,
        message: 'Usuario no existe'
      });
    }

  }


};
