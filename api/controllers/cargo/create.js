module.exports = {


  friendlyName: 'Create',


  description: 'Create Cargo.',


  inputs: {
    nombre: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
  /*
      return this.res.status(500).json({
        error: true,
        status: 401,
        message: 'Usuario no existe'
      });
      return exits.success({ error: false, user: us, token: token, message: 'Correcto' });
      { info : true, message : "Cargo registrada correctamente."}
      */
    const unique = await Cargo.find({nombre: inputs.nombre, estado: 'A'});
    if (unique.length > 0) {
      return this.res.status(401).json({ info : false, message : 'Nombre de esta Cargo ya existe'});
    }
    const objVerbo = await Cargo.create(inputs).fetch();
    if (objVerbo.length !== 0) {
      return exits.success({ info : true, message : 'Cargo registrada correctamente.'});
    }
    return this.res.status(401).json({ info : false, message : 'Error al registrar Cargo.'});

  }


};
