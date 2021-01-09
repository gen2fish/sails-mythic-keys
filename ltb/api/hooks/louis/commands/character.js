module.exports = {
  name: 'character',
  description: 'Character Manager',
  async execute(msg, args) {
    var DUID = msg

    // await msg.react('😄');
    msg.channel.send(await sails.helpers.setCharacter(args, DUID));
    // msg.react('✅');
    // msg.reactions.cache.get('😄').remove().catch(error => console.error('Failed to clear reactions: ', error));

  },
}
