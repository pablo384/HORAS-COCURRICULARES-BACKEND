module.exports = {


  friendlyName: 'Update',


  description: 'Update Persona.',


  inputs: {
    id: {
      type: 'number'
    },
    nombres: {
      type: 'string'
    },
    apellidos: {
      type: 'string'
    },
    direccion: {
      type: 'string'
    },
    cedula: {
      type: 'string',
    },
    matricula: {
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
    carrera: {
      type: 'number',
      required: true
    },
    esEstudiante: {
      type: 'boolean',
    },
    carnet: {
      type: 'string',
    },
    usuario: {
      type: 'string',
    },
    estado: {
      type: 'string',
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const objVerbo = await Persona.update({id: inputs.id},inputs).fetch();
    if (objVerbo.length !== 0) {
      return exits.success({ info : true, message : 'Persona actualizada correctamente.', data:objVerbo});
    }
    return this.res.status(401).json({ info : false, message : 'Error al registrar Persona.'});
  }


};
