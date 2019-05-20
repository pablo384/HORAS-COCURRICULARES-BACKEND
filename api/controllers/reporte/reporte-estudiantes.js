module.exports = {


  friendlyName: 'Get conferencia participadas',


  description: 'Get conferencia participadas Persona.',


  inputs: {
    // id: {
    //   type: 'number',
    //   required: true
    // },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let conferencias = await Conferencia.find();
    let cuatrimestres = await Cuatrimestre.find();
    let carreras = await Carrera.find();
    let user = await Persona.find({ esEstudiante: true })
      .populate('carrera')
      .populate('asistencias');

    for (let i = 0; i < user.length; i++) {
      let usr = user[i];
      if (usr.asistencias.length > 0) {
        // let asistencias = [];
        for (let e = 0; e < usr.asistencias.length; e++) {
          let asist = usr.asistencias[e];
          user[i].asistencias[e].conferencia = await Conferencia.findOne({ id: asist.conferencia });
        }
        // usr.asistencias = asistencias;
      }
    }

    if (user) {
      // const conf = await Asistencia.find({estudiante: user.id}).populate('conferencia');
      return exits.success({ info: true, data: user, conferencias, cuatrimestres, carreras });
    }
    return exits.success({ info: true, data: [] });

  }


};
