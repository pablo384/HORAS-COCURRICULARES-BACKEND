module.exports = {


  friendlyName: 'Create',


  description: 'Create carrera.',


  inputs: {
    nombre: {
      type: 'string',
      required: true
    },
    abreviatura: {
      type: 'string',
      required: true

    },
    horasRequeridas: {
      type: 'number',
      required: true
    },
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
      { info : true, message : "Carrera registrada correctamente."}
      */
    const unique = await Carrera.find({nombre: inputs.nombre, estado: 'A'});
    if (unique.length > 0) {
      return this.res.status(401).json({ info : false, message : 'Nombre de esta carrera ya existe'});
    }
    const objVerbo = await Carrera.create(inputs).fetch();
    if (objVerbo.length !== 0) {
      return exits.success({ info : true, message : 'Carrera registrada correctamente.'});
    }
    return this.res.status(401).json({ info : false, message : 'Error al registrar carrera.'});

  }


};
