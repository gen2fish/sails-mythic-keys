module.exports = {


  friendlyName: 'Get character',


  description: '',


  inputs: {
    msg: {type: 'json'},
    args: {type: 'json'}
  },


  exits: {

    success: {
      outputFriendlyName: 'Character',
    },

  },


  fn: async function (inputs) {



    // Get character.

    const discordUser = inputs.msg.author.id
    const discordName = inputs.msg.author.username
    const character = inputs.args


    var defaultChar = undefined;
    var inputChar = undefined;
    var defaultRealm = sails.defaultrealm

    var findUser = await DiscordUsers.findOne({
      userID: discordUser
    })

    if ( findUser != undefined ) {
      defaultRealm = findUser.defaultRealm
      defaultChar = await WowCharacters.findOne({
        nameSlug: findUser.defaultCharacter
      })

    }

    for ( c of character ){
      var search = c
      if (c.includes("-")) {
        search = c.split("-")[0]
      }

      wowChar = await WowCharacters.findOne({
        nameSlug: search.toLowerCase(),
        realm: defaultRealm.toLowerCase()
      })
      if ( wowChar != undefined ) {
        inputChar = wowChar
      }
    }

    if ( inputChar != undefined ){
      return inputChar
    } else if ( defaultChar != undefined ) {
      return defaultChar
    } else {
      return undefined;
    }

  }


};
