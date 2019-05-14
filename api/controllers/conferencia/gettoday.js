const moment = require('moment');
module.exports = {


  friendlyName: 'Gettoday',


  description: 'Gettoday conferencia.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const list = await Conferencia.find({estado: 'A', horaInicio: { contains: moment().toISOString().split('T')[0] }})
    .populate('carrera')
    .populate('conferencista')
    .populate('cuatrimestre');
    // return exits.success({ info : true, data : list});
    return exits.success({
      'info': true,
      'data': list
    });

  }


};
