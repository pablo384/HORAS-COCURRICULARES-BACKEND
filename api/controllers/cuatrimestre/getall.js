const moment = require('moment');
module.exports = {


  friendlyName: 'Getall',


  description: 'Getall cuatrimestre.',


  inputs: {
    fechaInicio: {
      type: 'string'
    },
    fechaFin: {
      type: 'string'
    },
    last: {
      type: 'boolean'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const inicio = moment(inputs.fechaInicio, 'YYYY-MM-DD').valueOf();
    const fin = moment(inputs.fechaFin, 'YYYY-MM-DD').valueOf();
    let list = [];
    if (inputs.fechaInicio && inputs.fechaFin) {
      if (inputs.fechaInicio === inputs.fechaFin) {

        list = await Cuatrimestre.find({ estado: 'A', fechaInicio: { '>=': inicio } }).populate('conferencias');
        if (list.length < 1) {
          list = await Cuatrimestre.find({ estado: 'A'}).populate('conferencias');

        }
        list = _.map(list, (val) => {
          val.conferencias = val.conferencias.length;
          return val;
        });
        return exits.success({ info: true, data: list });
      }
      list = await Cuatrimestre.find({ estado: 'A', fechaInicio: { '>=': inicio }, fechaFin: { '<=': fin } }).populate('conferencias');
      list = _.map(list, (val) => {
        val.conferencias = val.conferencias.length;
        return val;
      });
      return exits.success({ info: true, data: list });
    }

    list = await Cuatrimestre.find({ estado: 'A' }).populate('conferencias');
    list = _.map(list, (val) => {
      val.conferencias = val.conferencias.length;
      return val;
    });
    if (list.length > 0 && inputs.last) {

      return exits.success({ info: true, data: list[list.length - 1] });
    }
    return exits.success({ info: true, data: list });

  }


};
