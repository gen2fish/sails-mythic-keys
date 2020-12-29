module.exports = {


  friendlyName: 'Set realm',


  description: '',


  inputs: {
    args: {
      type: 'json',
      description: 'Discord Args'
    },
    discordUID: {
      type: 'json',
      description: 'Discord Message'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    // TODO
    /*
    Get user
    add if needed
    set realm
    return success or fail
    */
    args = inputs.args
    rtnMsg = ''
    if (args[0] == 'set'){
      char = args[1]
    } else {
      char = args[0]
    }

    var discordUser = await DiscordUsers.findOne({
      userID: inputs.discordUID.id
    })

    if (discordUser == undefined){
      discordUser = await DiscordUsers.create({
        userID: inputs.discordUID.id,
        userName: inputs.discordUID.username
      }).fetch();
    }

    var wowChar = await WowCharacters.findOne({
      nameSlug: char.toLowerCase()
    })

    if ( wowChar == undefined ) {
      return `No character by the name ${char} found.`
    }

    await DiscordUsers.update(discordUser).set({
      defaultCharacter: wowChar.nameSlug
    })

    return `Default Character set to ${wowChar.name}`
  }


};
