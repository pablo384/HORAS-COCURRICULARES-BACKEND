const moment = require('moment');
module.exports = {


  friendlyName: 'VerificarAsistencia',


  description: 'VerificarAsistencia de estudiantes.',


  inputs: {
    idPersona: {
      type: 'number',
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
    let persona = await Persona.findOne({ id: inputs.idPersona }).populate('carrera');
    if (persona && persona.esEstudiante) {
      const asistencias = await Asistencia.find(
        {
          where: { estudiante: persona.id, conferencia: inputs.idConferencia },
          sort: 'createdAt ASC'
        },
      );
      persona.asistencia = asistencias;
      if (asistencias.length === 0) {
        persona.entrada = true;
      } else {
        persona.entrada = false;
        const asis = asistencias[asistencias.length - 1];
        // console.log('PONCHANDO asistencia que veo ultima::', asis);
        if (asis.horaInicio !== '' && asis.horaFin !== '') {
          persona.entrada = true;
        }
      }
      if(persona.entrada) {
        ponche = await Asistencia.create({horaInicio: moment().toISOString(), estudiante: persona.id, conferencia: inputs.idConferencia}).fetch();
        console.log('PONCHANDO ENTRANDO', ponche);
      } else {
        const asis = asistencias[asistencias.length - 1];
        // const confe = await Conferencia.findOne({id: asis.conferencia});
        // let estud = await Persona.findOne({id: asis.estudiante});
        // (200*50)/100
        const hFin = moment().toISOString();
        const hCom = moment.duration(moment(hFin).valueOf(true) - moment(asis.horaInicio).valueOf(true));
        // let sum = (confe.porcientoHorasValidas*hCom.asHours())/100;
        // persona.horasAcumuladas += sum;
        // await Persona.update({id: persona.id}, {horasAcumuladas: persona.horasAcumuladas});
        console.log('EN HORAS LO QUE ESTUVE EN LA CONFERENCIA', hCom.asHours());
        ponche = await Asistencia.update({id: asis.id}, {horaFin: hFin, horasCompletadas: hCom.toISOString()}).fetch();
        console.log('PONCHANDO SALIENDO', ponche);
      }
      return exits.success({ info: true, data: ponche, message: 'Correcto.'});
    } else if (persona && !persona.esEstudiante) {
      return this.res.status(401).json({ info: false, message: 'Solo estudiantes pueden asistir.' });
    }
    return this.res.status(401).json({ info: false, message: 'No puede asistir a esta conferencia.' });
  }


};
