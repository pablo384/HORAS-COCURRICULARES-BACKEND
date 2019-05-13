const moment = require('moment');
module.exports = {


  friendlyName: 'Update',


  description: 'Update conferencia.',


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
    if (unique.length > 1) {
      return this.res.status(401).json({ info: false, message: 'Titulo de esta Conferencia ya existe' });
    }
    // console.log('HORA INICIO:::', moment(inputs.horaInicio, 'HH:mm').format('HH:mm a'));
    // inputs.horaInicio = moment(inputs.horaInicio).unix();
    inputs.horaInicio = moment(inputs.diaPresentacion+' ' +inputs.horaInicio, 'YYYY-MM-DD ' + 'HH:mm').toISOString();
    console.log('HORA INICIO GUARDADO:::', inputs.horaInicio );

    // console.log('duracion que llego', inputs.duracionEstimada);
    // console.log('duracion que guardo', moment(inputs.duracionEstimada, 'HH:mm:ss').format('HH:mm:ss'));
    if (!moment(inputs.duracionEstimada, 'HH:mm:ss').valueOf(true)) {
      return this.res.status(401).json({ info: false, message: 'Duracion de actividad no valida' });
    }
    inputs.duracionEstimada = moment.duration(inputs.duracionEstimada).toISOString();
    // console.log('duracion que guardo desde unix to text', moment.duration(inputs.duracionEstimada).hours(), inputs.duracionEstimada);
    // inputs.horaFin = inputs.horaInicio + moment.duration(inputs.duracionEstimada).milliseconds();
    inputs.diaPresentacion = moment(inputs.diaPresentacion, 'YYYY-MM-DD').toISOString();
    const objVerbo = await Conferencia.update({id: inputs.id}, inputs).fetch();
    if (objVerbo.length !== 0) {
      return exits.success({ info: true, message: 'Conferencia registrada correctamente.', data: objVerbo });
    }
    return this.res.status(401).json({ info: false, message: 'Error al registrar Conferencia.' });

  }


};
