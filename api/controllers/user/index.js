module.exports = {


  friendlyName: 'Index',


  description: 'Index user.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    // console.log(sails.hooks.graphql.abc);

    // return exits.success({msg:
    // sails.config.models.dataEncryptionKeys.default});
    // await Role.create({name: 'admin'});
    const role = await Role.findOne({ name: 'admin' });
    if (role) {
      const user = await User.create({
        name: 'Pablo',
        surname: 'Reinoso',
        nick: 'pablo384',
        role: role.id,
        password: '1234',
        email: 'info@pablo384.com',
        image: {
          urlBase: 'https://i.imgur.com/',
          id: 'o7BXJji',
          type: '.jpg',
          url: 'https://i.imgur.com/o7BXJji.jpg',
          deletehash: 'mRdwqVSrEiAwkBy'
        }
      }).fetch();
      return exits.success({ok:true, user , msg: 'todo correcto'});
    }
    return exits.success({ok: false, msg:'Error creando role'});


  }
};
