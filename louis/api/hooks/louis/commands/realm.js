module.exports = {
  name: 'realm',
  description: 'Set Default Realm for user',
  async execute(msg, args) {
    var DUID = msg.author

    msg.channel.send(await sails.helpers.setRealm(args, DUID));

  },
};
