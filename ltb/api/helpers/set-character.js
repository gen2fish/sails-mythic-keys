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
      description: 'Discord Message Author'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    switch(inputs.args[0]) {
      case "set":
        return await set(inputs)
        break;
      case "get":
        return await get(inputs)
        break;
      default:
        return `Unknown parameter ${inputs.args[0]}. Valid entries include \`set get\``
    }


  }
};

get = async function (inputs){
  const discordUID = inputs.discordUID
  const discProfile = await DiscordUsers.findOne({ userID: discordUID.id })

  if (!discProfile){
    return `Sorry <@${discordUID.id}>. I coudln't find any record of your defaults.`
  } else {
    sails.log.info(discProfile)
    return `I found you <@${discordUID.id}>. Your default realm is ${discProfile.defaultRealm} and your default character is ${discProfile.defaultCharacter}`

  }


};

set = async function (inputs){
  const discordUID = inputs.discordUID
  var inputCharacter
  var inputRealm = sails.defaultrealm

  for ( a of inputs.args ) {
    if ( a != 'set' ){
      if ( a.includes("-")){
        splite = a.split("-")

        inputCharacter = splite[0]
        inputRealm = splite[1]

      } else {
        inputCharacter = a
      }

    }
  }

  // Is that user in guild?
  if ( !await WowCharacters.findOne({ nameSlug: inputCharacter.toLowerCase(), realm: inputRealm.toLowerCase() }) ) {
    return `Could not find a character named ${inputCharacter}-${inputRealm} in guild.`
  }

  // Discord Profile exist? create if needed
  if ( !await DiscordUsers.findOne({ userID: discordUID.id }) ) {
    await DiscordUsers.create({
      userID: discordUID.id,
      userName: discordUID.username
    })
  }

  var defaultChar = `${inputCharacter.toLowerCase()}-${inputRealm.toLowerCase()}`
  sails.log.info(defaultChar)
  // Character exists and Discord profile created if needed
  await DiscordUsers.update({ userID: discordUID.id }).set({
    defaultCharacter: defaultChar
  })

  return `<@${discordUID.id}>, Saved! Your default character is now ${inputCharacter}`

};
