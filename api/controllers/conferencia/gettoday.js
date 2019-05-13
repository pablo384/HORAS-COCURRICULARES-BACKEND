module.exports = {


  friendlyName: 'Gettoday',


  description: 'Gettoday conferencia.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    return exits.success({
      'info': true,
      'data': []
    });

  }


};
