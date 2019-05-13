module.exports = {


  friendlyName: 'Getbyconferencia',


  description: 'Getbyconferencia conferencia.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const listCarreras = await Carrera.find();
    const listAsistencia = await Asistencia.find({estado: 'A', conferencia: inputs.id}).populate('estudiante');
    const tcarreras = [];
    const agrupado = _.groupBy(listAsistencia, 'estudiante.matricula');
    list = _.map(agrupado, (val) => {
      // console.log(key);
      val[0].estudiante.carrera = _.find(listCarreras, {id: val[0].estudiante.carrera}).abreviatura;
      if(!tcarreras.includes(val[0].estudiante.carrera)) {
        tcarreras.push(val[0].estudiante.carrera);
      }
      return val[0].estudiante;
    });
    return exits.success({ info : true, data : list, aCarreras: tcarreras});

  }


};
