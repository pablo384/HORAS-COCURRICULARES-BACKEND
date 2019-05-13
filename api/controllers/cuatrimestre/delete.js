module.exports = {


  friendlyName: 'Delete',


  description: 'Delete cuatrimestre.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const objVerbo = await Cuatrimestre.update({id: inputs.id}, {estado: 'D'}).fetch();
    if (objVerbo.length > 0) {
      return exits.success({ info : true, message : 'Cuatrimestre eliminada correctamente.', data: objVerbo});
    }
    return this.res.status(401).json({ info : false, message : 'Error al eliminar Cuatrimestre.'});


  }


};
