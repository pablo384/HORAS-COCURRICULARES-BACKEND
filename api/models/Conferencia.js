/**
 * Conferencia.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    titulo: {
      type: 'string',
      required: true
    },
    descripcion: {
      type: 'string'
    },
    horaInicio: {
      type: 'string',
      required: true,
    },
    horaFin: {
      type: 'string'
    },
    diaPresentacion: {
      type: 'string',
      required: true,
    },
    duracionEstimada: {
      type: 'string',
      required: true,
    },
    valorConf: {
      type: 'number',
      required: true,
    },
    porcientoHorasValidas: {
      type: 'number',
      required: true,
    },
    estado: {
      type: 'string',
      defaultsTo: 'A'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    carrera: {
      model: 'carrera',
    },
    cuatrimestre: {
      model: 'cuatrimestre',
    },
    conferencista: {
      model: 'persona',
    },
    asistencias: {
      collection: 'asistencia',
      via: 'conferencia'
    }
  },

};

