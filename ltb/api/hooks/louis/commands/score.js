module.exports = {
  name: 'score',
  description: 'Ping!',
  async execute(msg, args) {

    sails.log.info(args)
    if (args.length == 0){

      msg.channel.send("Usage is \`!score <character name>\`")

    } else {

      var searchRealm = 'bloodhoof'
      var searchUser = args[0]
      const discordUser = await DiscordUsers.findOne({
        userID: msg.author.id
      })

      if (discordUser != undefined){
        searchRealm = discordUser.defaultRealm
      }

      if (args[0].includes("-")) {
        searchUser = args[0].split("-")[0]
        searchRealm = args[0].split("-")[1]
      }

      sails.log.info(searchRealm)

      var mScore = await sails.helpers.raiderio.rioGetUser(searchUser, searchRealm)
      if (mScore.statusCode == 400 ){
        returnMsg = "Could not find requested character"
      } else {
        returnMsg = `Current RaiderIO for ${mScore.name} the ${mScore.race} ${mScore.class}: ${mScore.score}`
      }

      msg.channel.send(returnMsg)
    }
  },
};
