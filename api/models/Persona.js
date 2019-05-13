/**
 * Persona.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    nombres: {
      type: 'string',
      required: true
    },
    apellidos: {
      type: 'string',
      required: true
    },
    direccion: {
      type: 'string',
      required: true
    },
    cedula: {
      type: 'string',
    },
    matricula: {
      type: 'string',
    },
    carnet: {
      type: 'string',
    },
    usuario: {
      type: 'string',
    },
    telefono: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    cargo: {
      type: 'string',
    },
    trabajo: {
      type: 'string',
    },
    horasAcumuladas: {
      type: 'number',
      defaultsTo: 0
    },
    esEstudiante: {
      type: 'boolean',
      defaultsTo: true
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
    asistencias: {
      collection: 'asistencia',
      via: 'estudiante'
    },
    conferencias: {
      collection: 'conferencia',
      via: 'conferencista'
    }
  },

};

