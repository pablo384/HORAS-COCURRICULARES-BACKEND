/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  const users = await User.find({email: 'info@pablo384.com', estado: 'A'});
  console.log('adminc l:', users.length);
  if (users.length <= 0) {
    await User.create({
      name: 'Admin',
      surname: 'Admin',
      nick: 'admin',
      password: '1234',
      email: 'info@pablo384.com',
      isAdmin: true,
      tipo: 'admin'
      // image: {
      //   urlBase: 'https://i.imgur.com/',
      //   id: 'o7BXJji',
      //   type: '.jpg',
      //   url: 'https://i.imgur.com/o7BXJji.jpg',
      //   deletehash: 'mRdwqVSrEiAwkBy'
      // }
    }).fetch();
  }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

};
