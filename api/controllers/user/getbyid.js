module.exports = {


  friendlyName: 'Getall',


  description: 'Getall user.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var user = await User.findOne({ id: inputs.id });
    user.password = undefined;
    user.image = undefined;
    return exits.success({ info: true, data: user });

  }


};
