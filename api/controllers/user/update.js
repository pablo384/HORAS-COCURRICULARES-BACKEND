var bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
    name: {
      type: 'string',
    },
    surname: {
      type: 'string',
    },
    nick: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    state: {
      type: 'string',
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
    estado:{
      type: 'string',
      defaultsTo:'A'
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    if (inputs.password){
      inputs.password = await bcrypt.hash(inputs.password, 10);
    }
    const updated = await User.update({id: inputs.id}, inputs).fetch();



    if (!updated) {
      return exits.success({ info: false, data: updated, message: 'Error al actualizar usuario' });
    }
    return exits.success({ info: true, data: updated, message: 'Usuario actualizado' });

  }


};
