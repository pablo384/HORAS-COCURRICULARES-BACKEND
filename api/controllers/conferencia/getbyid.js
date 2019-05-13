const moment = require('moment');
module.exports = {


  friendlyName: 'Getbyid',


  description: 'Getbyid Conferencia.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let list = await Conferencia.findOne({id: inputs.id })
    .populate('carrera')
    .populate('conferencista')
    .populate('cuatrimestre');
    // list = _.map(list, (val) => {
    // list.conferencias = list.conferencias.length;
    //   return val;
    // });
    if (list) {
      console.log('DURACION ETA GETBYID:', list.duracionEstimada);
      const dmo = moment.duration(list.duracionEstimada);
      // const dmohInit = moment(list.horaInicio, 'HH:mm');
      // list.horaInicio = dmohInit.toISOString();
      list.duracionEstimada = `${dmo.hours()<11?'0'+dmo.hours(): dmo.hours()}:${dmo.minutes()<11?'0'+dmo.minutes():dmo.minutes()}:${dmo.seconds()<11?'0'+dmo.seconds():dmo.seconds()}`;
      list.cuatrimestre = list.cuatrimestre.id;
      return exits.success({ info: true, data: list });
    }
    return exits.success({ info: true });

  }


};
