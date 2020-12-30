module.exports = {
  name: 'key',
  description: 'Add Key',
  async execute(msg, args) {
    var setKey = await sails.helpers.getDungeon(args)

    var user = await sails.helpers.getCharacter(msg,args)


    if ( user == undefined ) {
      msg.channel.send("Unable to find a character for you. Did you set a default?")
    } else if ( setKey.dungeon == undefined) {
      msg.channel.send("I couldn't figure out which dungeon that was.")
    } else if ( setKey.level == undefined ) {
      msg.channel.send("I couldn't figure out what level that key was.")
    }

    else {
      msg.channel.send(`<@${msg.author.id}>, Saved! ${user.name} has a ${setKey.dungeon.name}(${setKey.level})`);
    }
  },
};
