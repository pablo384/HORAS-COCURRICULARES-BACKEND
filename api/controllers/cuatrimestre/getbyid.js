module.exports = {


  friendlyName: 'Getbyid',


  description: 'Getbyid cuatrimestre.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let list = await Cuatrimestre.findOne({id: inputs.id }).populate('conferencias');
    // list = _.map(list, (val) => {
    list.conferencias = list.conferencias.length;
    //   return val;
    // });
    if (list) {

      return exits.success({ info: true, data: [list] });
    }
    return exits.success({ info: true });

  }


};
