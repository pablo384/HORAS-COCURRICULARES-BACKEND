const moment = require('moment');
module.exports = {


  friendlyName: 'Create',


  description: 'Create cuatrimestre.',


  inputs: {
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
    inputs.fechaInicio = moment(inputs.fechaInicio, 'YYYY-MM-DD').toISOString();
    inputs.fechaFin = moment(inputs.fechaFin, 'YYYY-MM-DD').toISOString();
    const objVerbo = await Cuatrimestre.create(inputs).fetch();
    if (objVerbo.length !== 0) {
      return exits.success({ info : true, message : 'Cuatrimestre registrada correctamente.', data:objVerbo});
    }
    return this.res.status(401).json({ info : false, message : 'Error al registrar Cuatrimestre.'});
  }


};
