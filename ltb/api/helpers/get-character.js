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


    var findUser = await DiscordUsers.findOne({
      userID: discordUser
    })


    var char = undefined

    if ( findUser != undefined ) {
      char = await WowCharacters.findOne({
        nameSlug: findUser.defaultCharacter
      })

    } else {
      char = await WowCharacters.findOne({
        nameSlug: discordName.toLowerCase()
      })


    }

    if ( char == undefined ) {

      for ( c of character ){
        wowChar = await WowCharacters.findOne({
          nameSlug: c.toLowerCase()
        })
        if ( wowChar != undefined ) {
          char = wowChar


        }
      }
    }
    // Send back the result through the success exit.

    return char;

  }


};
