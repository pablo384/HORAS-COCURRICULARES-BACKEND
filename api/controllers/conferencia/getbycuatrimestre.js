module.exports = {


  friendlyName: 'Getbycuatrimestre',


  description: 'Getbycuatrimestre conferencia.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const list = await Conferencia.find({estado: 'A', cuatrimestre: inputs.id});
    return exits.success({ info : true, data : list});

  }


};
