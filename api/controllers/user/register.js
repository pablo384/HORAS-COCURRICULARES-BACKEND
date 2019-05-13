module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
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
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
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
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var us = await User.create(inputs).fetch();
    if (us) {
      return exits.success({info: true, data: us, message:'Usuario registrado'});
    }else{
      return exits.success({info: false, message:'Error al registrar usuario'});
    }

  }


};
