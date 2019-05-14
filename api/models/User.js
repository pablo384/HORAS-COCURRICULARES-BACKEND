/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    surname: {
      type: 'string',
      required: true
    },
    nick: {
      type: 'string',
      unique: true,
      required: true
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    tipo: {
      type: 'string',
      defaultsTo: 'v'
    },
    password: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    cedula: {
      type: 'string',
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    image:{type:'json'},
    estado:{
      type: 'string',
      defaultsTo:'A'
    },
    // emailVerify:{
    //   type: 'boolean',
    //   defaultsTo:true
    // },
    // tokenEmailVerify:{
    //   type: 'string'
    // },
  },

  beforeCreate: function (values, cb) {
    // Hash password
    bcrypt.hash(values.password, 10,  (err, hash) => {
      if (err) {return cb(err);}
      values.password = hash;
      //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
      cb();
    });
  }
};

