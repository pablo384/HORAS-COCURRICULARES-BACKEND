module.exports = {


  friendlyName: 'Getall',


  description: 'Getall cuatrimestre.',


  inputs: {
    esEstudiante: {
      type: 'boolean'
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let list = [];
    if (inputs.esEstudiante) {
      list = await Persona.find({esEstudiante: true}).populate('carrera');
    }else {
      list = await Persona.find({esEstudiante: false});
    }
    return exits.success({ info : true, data : list});
  }


};
