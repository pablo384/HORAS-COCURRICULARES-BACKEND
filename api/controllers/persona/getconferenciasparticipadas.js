module.exports = {


  friendlyName: 'Get conferencia participadas',


  description: 'Get conferencia participadas Persona.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let user = await Persona.findOne({id: inputs.id }).populate('carrera');
    if (user) {
      const conf = await Asistencia.find({estudiante: user.id}).populate('conferencia');
      return exits.success({ info: true, data: conf });
    }
    return exits.success({ info: true, data: []});

  }


};
