module.exports = {


  friendlyName: 'Getall',


  description: 'Getall user.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var users = await User.find();
    users.map(
      user => {
        // user.surname = undefined;
        user.password = undefined;
        user.image = undefined;
        // user.surname = undefined;
        return user;
      }
    );
    return exits.success({info:true, data: users});

  }


};
