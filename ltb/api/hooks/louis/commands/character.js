module.exports = {
  name: 'character',
  description: 'Character Manager',
  async execute(msg, args) {
    var DUID = msg.author

    msg.channel.send(await sails.helpers.setCharacter(args, DUID));

  },
}
