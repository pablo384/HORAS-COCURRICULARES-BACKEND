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
    const confe = await Conferencia.findOne({ id: inputs.id });
    const listAsistencia = await Asistencia.find({ estado: 'A', conferencia: inputs.id }).populate('estudiante');
    const tcarreras = [];
    const agrupado = _.groupBy(listAsistencia, 'estudiante.matricula');
    list = _.map(agrupado, (val) => {
      // console.log(key);
      val[0].estudiante.carrera = _.find(listCarreras, { id: val[0].estudiante.carrera }).abreviatura;
      if (!tcarreras.includes(val[0].estudiante.carrera)) {
        tcarreras.push(val[0].estudiante.carrera);
      }
      return val[0].estudiante;
    });
    const totalAsistencia = list.length;
    const agrupadoPorCarrera = _.groupBy(list, 'carrera');
    let listadoPorCarrea = _.map(agrupadoPorCarrera, (value, key) => {
      return {
        carrera: key,
        asistencia: value.length,
        porciento: (value.length * 100) / totalAsistencia,
        estudiantes: value
      };
    });
    return exits.success({ info: true, data: list, aCarreras: tcarreras, listadoPorCarrea, totalAsistencia, conferencia: confe });

  }


};
