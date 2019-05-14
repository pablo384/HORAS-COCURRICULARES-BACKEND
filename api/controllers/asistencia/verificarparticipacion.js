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
    let msg = '';
    let persona = await Persona.findOne({or:[{ matricula: inputs.termPersona }, {carnet: inputs.termPersona}, {usuario: inputs.termPersona}]}).populate('carrera');
    if (persona && persona.esEstudiante) {
      const asistencias = await Asistencia.find(
        {
          where: { estudiante: persona.id, conferencia: inputs.idConferencia },
          sort: 'createdAt DESC'
        },
      );
      const conferencia = await Conferencia.findOne({id: inputs.idConferencia});
      persona.asistencia = asistencias;
      if (asistencias.length === 0) {
        persona.entrada = true;
        console.log('CONFF:::', conferencia);
        
        let horaInicio = moment(conferencia.horaInicio);
        let horaActual = moment();
        let duracion = moment.duration(conferencia.duracionEstimada);
        let diff = horaActual.diff(horaInicio);
        let calc = (diff*100)/duracion.asMilliseconds();
        console.log('DIFERENCIA::: ', diff, 'DURACION:::', duracion.asMilliseconds(), 'CALCULO DE % ', calc);
        if (calc >= conferencia.porcientoHorasValidas) {
          msg = 'Has durado mucho tiempo fuera, las horas no seran aplicadas a tu perfil, pero puedes entrar si prefieres.';
        }
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
          let calc = (diff*100)/duracion.asMilliseconds();
          console.log('DIFERENCIA::: ', diff, 'DURACION:::', duracion.asMilliseconds(), 'CALCULO DE % ', calc);
          if (calc >= conferencia.porcientoHorasValidas) {
            msg = 'Has durado mucho tiempo fuera, las horas no seran aplicadas a tu perfil, pero puedes entrar si prefieres.';
          }

        }else {

        }
        // else if (asis.horaInicio != 0) {

        // }
        // }
      }
      persona.idConferencia = inputs.idConferencia;
      return exits.success({ info: true, data: persona, message: msg });
    } else if (persona && !persona.esEstudiante) {
      return this.res.status(401).json({ info: false, message: 'Solo estudiantes pueden asistir.' });
    }
    return this.res.status(401).json({ info: false, message: 'No puede asistir a esta conferencia.' });
  }


};
