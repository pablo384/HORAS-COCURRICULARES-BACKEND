const moment = require('moment');
module.exports = {


  friendlyName: 'Getbycuatrimestre',


  description: 'Getbycuatrimestre conferencia.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const listAsistencias = await Asistencia.find({conferencia: inputs.id});
    const hashEstudantesDuracion = {};

    for (let i = 0; i < listAsistencias.length; i++) {
      const asist = listAsistencias[i];
      // let estudiante = await Persona.findOne({id: asist.estudiante});
      if (!asist.horaFin || asist.horaFin === '' || asist.horaFin === null || asist.horaFin === undefined || asist.horaFin.length < 3) {
        asist.horaFin = moment().toISOString();
        await Asistencia.update({id: asist.id}, asist );
      }
      let horaInicio = moment(asist.horaInicio);
      let horaActual = moment(asist.horaFin);
      // let duracion = moment.duration(conferencia.duracionEstimada);
      let diff = horaActual.diff(horaInicio);
      // console.log('DIFERENCIA::', diff, moment.duration(diff).asHours(),moment.duration(diff).toISOString());
      if (hashEstudantesDuracion[asist.estudiante]) {
        hashEstudantesDuracion[asist.estudiante] += diff;
      }else {
        hashEstudantesDuracion[asist.estudiante] = diff;
      }
    }
    const conf = await Conferencia.findOne({id: inputs.id});
    const listhashEstudantesDuracion =  _.map(hashEstudantesDuracion, (val, key)=>{
      return {id: parseInt(key), val: val};
    });

    for (let i = 0; i < listhashEstudantesDuracion.length; i++) {
      const valDEstud = listhashEstudantesDuracion[i];
      let estudiante = await Persona.findOne({id: valDEstud.id});

      let horaInicio = moment(conf.horaInicio);
      let horaActual = moment();
      let duracion = moment.duration(conf.duracionEstimada);
      let diff = horaActual.diff(horaInicio);
      // (21098826(diff)*100)/18000000(dur eta)
      let calc = (diff*100)/duracion.asMilliseconds();
      if (calc >= conf.porcientoHorasValidas) {
        // console.log('ACREDITAR::',conf.valorConf );
        estudiante.horasAcumuladas = conf.valorConf + estudiante.horasAcumuladas;
        // console.log('ACREDITAR01::',conf.valorConf, 'estudiante:::: ', estudiante );
        estudiante = await Persona.update({id: estudiante.id}, {...estudiante}).fetch();
        // console.log('ACREDITAR02::',conf.valorConf, 'RES ESTUDIANTE:::', estudiante );
      }
      // console.log(':::DURACION',diff, duracion.asMilliseconds(),'DURACION:::::porcioento:;',calc);
      // console.log('conff::', conf, valDEstud, 'estudiante::', estudiante.horasAcumuladas);
    }
    const fin = moment();
    // await Persona.update({id: estudiante.id}, estudiante)
    const confFinalizada = await Conferencia.update({ id: inputs.id }, { horaFin: fin.toISOString() }).fetch();
    // return exits.success({ info: true, message: `Actividad finalizada a las ${fin.format('HH:mm:ss a')}`, listAsistencias, hashEstudantesDuracion });
    if (confFinalizada) {

      return exits.success({ info: true, message: `Actividad finalizada a las ${fin.format('HH:mm:ss a')}`, data: confFinalizada });
    } else {
      return this.res.status(401).json({ info: false, message: 'Error al finalizar actividad.' });
    }

  }


};
