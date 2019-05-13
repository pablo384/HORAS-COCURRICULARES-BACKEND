module.exports = {


  friendlyName: 'Update',


  description: 'Update cuatrimestre.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
    nombre: {
      type: 'string'
    },
    abreviatura: {
      type: 'string',
      required: true
    },
    horasRequeridas: {
      type: 'number'
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    /*
      return exits.success({ info : true, message : 'Carrera registrada correctamente.'});
    return this.res.json(401, { info : false, message : 'Error al registrar carrera.'});
    */
    const unique = await Carrera.find({nombre: inputs.nombre, estado: 'A'});
    if (unique.length > 1) {
      return this.res.status(401).json({ info : false, message : 'Nombre de esta carrera ya existe'});
    }
    const objVerbo = await Carrera.update({id: inputs.id}, inputs).fetch();
    if (objVerbo !== 0) {
      return exits.success({ info : true, message : 'Carrera actualizada correctamente.'});
    }
    return this.res.status(401).json({ info : false, message : 'Error al actualizar carrera.'});

  }


};
