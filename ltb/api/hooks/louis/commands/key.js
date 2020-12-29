module.exports = {
  name: 'key',
  description: 'Add Key',
  async execute(msg, args) {
    var setKey = await sails.helpers.getDungeon(args)

    var user = await sails.helpers.getCharacter(msg,args)
    sails.log.info(user)
    msg.channel.send("BORF")
    // msg.channel.send(`<@${msg.author.id}>, Saved! ${msg.author.username} has a ${setKey.dungeon}(${setKey.level})`);
  },
};
