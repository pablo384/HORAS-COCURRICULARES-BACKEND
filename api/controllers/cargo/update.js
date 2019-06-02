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
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    /*
      return exits.success({ info : true, message : 'Cargo registrada correctamente.'});
    return this.res.json(401, { info : false, message : 'Error al registrar Cargo.'});
    */
    const unique = await Cargo.find({nombre: inputs.nombre, estado: 'A'});
    if (unique.length > 1) {
      return this.res.status(401).json({ info : false, message : 'Nombre de esta Cargo ya existe'});
    }
    const objVerbo = await Cargo.update({id: inputs.id}, inputs).fetch();
    if (objVerbo !== 0) {
      return exits.success({ info : true, message : 'Cargo actualizada correctamente.'});
    }
    return this.res.status(401).json({ info : false, message : 'Error al actualizar Cargo.'});

  }


};
