const moment = require('moment');
module.exports = {


  friendlyName: 'Create',


  description: 'Create Conferencia.',


  inputs: {
    titulo: {
      type: 'string',
      required: true
    },
    descripcion: {
      type: 'string'
    },
    horaInicio: {
      type: 'string',
      required: true,
    },
    diaPresentacion: {
      type: 'string',
      required: true,
    },
    duracionEstimada: {
      type: 'string',
      required: true,
    },
    porcientoHorasValidas: {
      type: 'number',
      required: true,
    },
    carrera: {
      type: 'number',
      required: true,
    },
    conferencista: {
      type: 'number',
      required: true,
    },
    cuatrimestre: {
      type: 'number',
      required: true,
    },
    valorConf: {
      type: 'number',
      required: true,
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const unique = await Conferencia.find({ titulo: inputs.titulo, estado: 'A' });
    if (unique.length > 0) {
      return this.res.status(401).json({ info: false, message: 'Titulo de esta Conferencia ya existe' });
    }
    inputs.horaInicio = moment(inputs.diaPresentacion+' ' +inputs.horaInicio, 'YYYY-MM-DD ' + 'HH:mm').toISOString();
    if (!moment(inputs.duracionEstimada, 'HH:mm:ss').valueOf(true)) {
      return this.res.status(401).json({ info: false, message: 'Duracion de actividad no valida' });
    }
    inputs.duracionEstimada = moment.duration(inputs.duracionEstimada).toISOString();
    inputs.diaPresentacion = moment(inputs.diaPresentacion, 'YYYY-MM-DD').toISOString();
    // inputs.horaFin = inputs.horaInicio + moment.duration(inputs.duracionEstimada).milliseconds();
    const objVerbo = await Conferencia.create(inputs).fetch();
    if (objVerbo.length !== 0) {
      return exits.success({ info: true, message: 'Conferencia registrada correctamente.', data: objVerbo });
    }
    return this.res.status(401).json({ info: false, message: 'Error al registrar Conferencia.' });

  }


};
