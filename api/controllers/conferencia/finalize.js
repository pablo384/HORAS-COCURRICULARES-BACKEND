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
    const listAsistencias = await Asistencia.find({ conferencia: inputs.id });
    const hashEstudantesDuracion = {};

    for (let i = 0; i < listAsistencias.length; i++) {
      const asist = listAsistencias[i];
      // let estudiante = await Persona.findOne({id: asist.estudiante});
      if (!asist.horaFin || asist.horaFin === '' || asist.horaFin === null || asist.horaFin === undefined || asist.horaFin.length < 3) {
        asist.horaFin = moment().toISOString();
        // console.log('33: ANTES DE ACTUALIZAR', asist);
        await Asistencia.updateOne({ id: asist.id }, JSON.parse(JSON.stringify(asist)));
        // console.log('35: LUEGO DE ACTUALIZAR', asist);
      }
      let horaInicio = moment(asist.horaInicio);
      let horaActual = moment(asist.horaFin);
      // let duracion = moment.duration(conferencia.duracionEstimada);
      let diff = horaActual.diff(horaInicio);
      // console.log('DIFERENCIA::', diff, moment.duration(diff).asHours(),moment.duration(diff).toISOString());
      if (hashEstudantesDuracion[asist.estudiante]) {
        hashEstudantesDuracion[asist.estudiante] += diff;
      } else {
        hashEstudantesDuracion[asist.estudiante] = diff;
      }
    }
    const conf = await Conferencia.findOne({ id: inputs.id });
    const listhashEstudantesDuracion = _.map(hashEstudantesDuracion, (val, key) => {
      return { id: parseInt(key), val: val };
    });
    // console.log('listhashEstudantesDuracion.length::', listhashEstudantesDuracion.length);
    for (let i = 0; i < listhashEstudantesDuracion.length; i++) {
      const valDEstud = listhashEstudantesDuracion[i];
      let estudiante = await Persona.findOne({ id: valDEstud.id });

      let horaInicio = moment(conf.horaInicio);
      let horaActual = moment();
      let diff = horaActual.diff(horaInicio);
      // let duracion = moment.duration(conf.duracionEstimada);
      // (21098826(diff)*100)/18000000(dur eta)
      // console.log('01:::DURACION', diff, duracion.asMilliseconds(), 'DURACION:::::porcioento:;', calc);
      // console.log('ACREDITAR::', conf.valorConf);
      let asistenciasDeEstaActividad = await Asistencia.find({ conferencia: conf.id, estudiante: estudiante.id });
      console.log('LONGITUD ASISTENCIA:::', asistenciasDeEstaActividad.length, ':::ARR ASISTENCIA:::');
      // console.log(':::ARR ASISTENCIA:::', asistenciasDeEstaActividad);
      
      if (asistenciasDeEstaActividad.length >= 1) {
        let durMili = 0;
        for (let e = 0; e < asistenciasDeEstaActividad.length; e++) {
          const asisEst = asistenciasDeEstaActividad[e];
          const asisInicio = moment(asisEst.horaInicio);
          const asisFin = moment(asisEst.horaFin);
          durMili += asisFin.diff(asisInicio);
        }
        console.log( durMili, ':::Duracion DENTRO::::', moment.duration(durMili).asHours());
        let calc = (durMili * 100) / diff;
        console.log( ':::%%% DENTRO::::', calc, ':::de:::h', moment.duration(diff).asHours(),'::Milise::', diff);
        if (calc >= conf.porcientoHorasValidas) {
          await Asistencia.updateOne({ id: asistenciasDeEstaActividad[asistenciasDeEstaActividad.length - 1].id },
            JSON.parse(JSON.stringify({
              ...asistenciasDeEstaActividad[asistenciasDeEstaActividad.length - 1],
              horasAplicadas: conf.valorConf
            }))
          );
          estudiante.horasAcumuladas = conf.valorConf + estudiante.horasAcumuladas;
          console.log('ACREDITAR01::', conf.valorConf, 'estudiante:::: ', estudiante.horasAcumuladas);
          estudiante = await Persona.update({ id: estudiante.id }, { ...estudiante }).fetch();
          console.log('ACREDITAR02::', conf.valorConf, 'RES ESTUDIANTE:::', estudiante.horasAcumuladas);
        }
      }
      // console.log(':::DURACION', diff, duracion.asMilliseconds(), 'DURACION:::::porcioento:;', calc);
      // console.log('conff::', conf, valDEstud, 'estudiante::', estudiante.horasAcumuladas);
    }
    const fin = moment();
    // await Persona.update({id: estudiante.id}, estudiante)
    // console.log('82: ANTES DE ACTUALIZAR');
    const confFinalizada = await Conferencia.update({ id: inputs.id },JSON.parse(JSON.stringify({ horaFin: fin.toISOString() })) ).fetch();
    // return exits.success({ info: true, message: `Actividad finalizada a las ${fin.format('HH:mm:ss a')}`, listAsistencias, hashEstudantesDuracion });
    if (confFinalizada) {

      return exits.success({ info: true, message: `Actividad finalizada a las ${fin.format('HH:mm:ss a')}`, data: confFinalizada });
    } else {
      return this.res.status(401).json({ info: false, message: 'Error al finalizar actividad.' });
    }

  }


};
