module.exports = {


  friendlyName: 'Create',


  description: 'Create Persona.',


  inputs: {
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
    telefono: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    cargo: {
      type: 'string',
    },
    carnet: {
      type: 'string',
    },
    usuario: {
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
    },
    estado: {
      type: 'string',
    },
    carrera: {
      type: 'string',
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    
    if (inputs.esEstudiante) {
      
      let exist = await Persona.find({matricula: inputs.matricula, estado: 'A'});
      let exist02 = await Persona.find({carnet: inputs.carnet, estado: 'A'});
      if (exist.length > 0) {
        return this.res.status(401).json({ info : false, message : 'Ya existe estudiante con esa matricula'});
        
      }
      if (exist02.length > 0) {
        return this.res.status(401).json({ info : false, message : 'Ya existe estudiante con ese carnet'});
        
      }
    }
    const objVerbo = await Persona.create(inputs).fetch();
    if (objVerbo.length !== 0) {
      return exits.success({ info : true, message : 'Persona registrada correctamente.', data:objVerbo});
    }
    return this.res.status(401).json({ info : false, message : 'Error al registrar Persona.'});

  }


};
