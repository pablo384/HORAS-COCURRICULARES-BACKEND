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
      const listAsis = await Asistencia.find({estudiante: user.id}).populate('conferencia');
      // let listAgrupada;
      // listAgrupada = _.groupBy(listAsis, 'conferencia.id');
      // let listaFinal = [];
      // _.forEach(_.keys(listAgrupada), (val) => {
      //   // console.log( val);
      //   let hAplied = 0;
      //   for (let o = 0; o < listAgrupada[val].length; o++) {
      //     const asis = listAgrupada[val][o];
      //     if (asis.horasAplicadas !== 0) {
      //       hAplied+=asis.horasAplicadas;
      //     }
      //   }
      //   listAgrupada[val][0].conferencia.horasAplicadas = hAplied;
      //   listaFinal.push(listAgrupada[val][0].conferencia);

      // });
      // for (let i = 0; i < listAsis.length; i++) {
      //   const asis = listAsis[i];
      // }
      return exits.success({ info: true, data: listAsis });
    }
    return exits.success({ info: true, data: []});

  }


};
