module.exports = {


  friendlyName: 'Getall',


  description: 'Getall cuatrimestre.',


  inputs: {
    id: {
      type: 'number'
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    if (inputs.id) {
      const list = await Carrera.find({id: inputs.id, estado: 'A'});
      return exits.success({ info : true, data : list[0]});
    }
    const list = await Carrera.find({estado: 'A'});
    return exits.success({ info : true, data : list});

  }


};
