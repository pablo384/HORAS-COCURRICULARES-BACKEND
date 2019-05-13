module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user.',


  inputs: {
    id: {
      type: 'string',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    // const deleted = await User.deleteOne({ id: inputs.id }).fetch();
    const deleted = await User.update({ id: inputs.id }, { estado: 'D' }).fetch();
    if (!deleted) {
      return exits.success({ ok: false, data: deleted, msg: 'Error al borrar usuario' });
    }
    return exits.success({ ok: true, data: deleted, msg: 'Usuario borrado' });

  }


};
