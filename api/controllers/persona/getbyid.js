module.exports = {


  friendlyName: 'Getbyid',


  description: 'Getbyid Persona.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let list = await Persona.findOne({id: inputs.id }).populate('carrera');
    if (list) {
      return exits.success({ info: true, data: list });
    }
    return exits.success({ info: true });

  }


};
