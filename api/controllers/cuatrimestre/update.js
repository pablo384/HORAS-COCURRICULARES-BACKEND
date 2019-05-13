const moment = require('moment');
module.exports = {


  friendlyName: 'Update',


  description: 'Update cuatrimestre.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
    titulo: {
      type: 'string',
      required: true
    },
    descripcion: {
      type: 'string'
    },
    fechaInicio: {
      type: 'string',
      required: true,
    },
    fechaFin: {
      type: 'string',
      required: true,
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const unique = await Cuatrimestre.find({titulo: inputs.titulo, estado: 'A'});
    if (unique.length > 0) {
      return this.res.status(401).json({ info : false, message : 'Titulo de esta Cuatrimestre ya existe'});
    }
    inputs.fechaInicio = moment(inputs.fechaInicio, 'YYYY-MM-DD').valueOf();
    inputs.fechaFin = moment(inputs.fechaFin, 'YYYY-MM-DD').valueOf();
    const objVerbo = await Cuatrimestre.update({id: inputs.id},inputs).fetch();
    if (objVerbo.length !== 0) {
      return exits.success({ info : true, message : 'Cuatrimestre actualizado correctamente.', data:objVerbo});
    }
    return this.res.status(401).json({ info : false, message : 'Error al registrar Cuatrimestre.'});
  }


};
