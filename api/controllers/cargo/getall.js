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
      const list = await Cargo.find({id: inputs.id, estado: 'A'});
      return exits.success({ info : true, data : list[0]});
    }
    let list = await Cargo.find({estado: 'A'});
    // list = _.map(list, (val) => {
    //   val.abrNombre = val.abreviatura + ' - ' + val.nombre;
    //   return val;
    // });
    return exits.success({ info : true, data : list});

  }


};
