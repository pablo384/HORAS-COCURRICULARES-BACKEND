const moment = require('moment');
module.exports = {


  friendlyName: 'VerificarAsistencia',


  description: 'VerificarAsistencia de estudiantes.',


  inputs: {
    termPersona: {
      type: 'string',
      required: true
    },
    idConferencia: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let persona = await Persona.findOne({or:[{ matricula: inputs.termPersona }, {carnet: inputs.termPersona}, {usuario: inputs.termPersona}]}).populate('carrera');
    if (persona && persona.esEstudiante) {
      const asistencias = await Asistencia.find(
        {
          where: { estudiante: persona.id, conferencia: inputs.idConferencia },
          sort: 'createdAt DESC'
        },
      );
      const conferencia = await Conferencia.find({id: inputs.idConferencia});
      persona.asistencia = asistencias;
      if (asistencias.length === 0) {
        persona.entrada = true;
      } else {
        persona.entrada = false;
        // for (let i = 0; i < asistencias.length; i++) {
        const asis = asistencias[0];
        console.log('asistencia que veo ultima::', asis);
        if (asis.horaInicio !== '' && asis.horaFin !== '') {
          persona.entrada = true;
          let horaInicio = moment(conferencia.horaInicio);
          let horaActual = moment();
          let duracion = moment.duration(conferencia.duracionEstimada);
          let diff = horaActual.diff(horaInicio);
          console.log('DIFERENCIA::: ', diff, 'DURACION:::', duracion.asSeconds());
          

        }else {

        }
        // else if (asis.horaInicio != 0) {

        // }
        // }
      }
      persona.idConferencia = inputs.idConferencia;
      return exits.success({ info: true, data: persona });
    } else if (persona && !persona.esEstudiante) {
      return this.res.status(401).json({ info: false, message: 'Solo estudiantes pueden asistir.' });
    }
    return this.res.status(401).json({ info: false, message: 'No puede asistir a esta conferencia.' });
  }


};
