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
      case "unclaim":
        return await unclaim(inputs)
        break;
      default:
        return `Unknown parameter ${inputs.args[0]}. Valid entries include \`set get\``
    }


  }
};

get = async function (inputs){
  const discordUID = inputs.discordUID.author
  const discProfile = await DiscordUsers.findOne({ userID: discordUID.id })

  if (!discProfile){
    return `Sorry <@${discordUID.id}>. I coudln't find any record of your defaults.`
  } else {
    sails.log.info(discProfile)
    return `I found you <@${discordUID.id}>. Your default realm is ${discProfile.defaultRealm} and your default character is ${discProfile.defaultCharacter}`

  }


};

unclaim = async function (inputs) {
  const Discord = require('discord.js')
  const discordUID = inputs.discordUID

  return "BORF"
};

set = async function (inputs){
  const discordUID = inputs.discordUID.author
  var inputCharacter
  var inputRealm = sails.defaultrealm

  for ( a of inputs.args ) {
    if ( a != 'set' ){
      if ( a.includes("-")){
        splite = a.split("-")

        inputCharacter, inputRealm = splite


      } else {
        inputCharacter = a
      }

    }
  }

  if ( inputCharacter === undefined ){
    inputCharacter = discordUID.username.toLowerCase()
  }

  // Does that user Exist
  var wowExist = await sails.helpers.blizzard.getCharacter(inputCharacter,inputRealm)
  if ( wowExist === undefined) {
      return `Could not find a character named ${inputCharacter} on ${inputRealm}.`
  }

  wowExist = await WowCharacters.findOne(wowExist)

  if ( wowExist.discordUser === undefined ) {
    wowExist = await WowCharacters.update({
      wowID: wowExist.wowID
    }).set({ discordUser: discordUID.id})
  } else if ( wowExist.discordUser != discordUID.id ) {
    return `Sorry <@${discordUID.id}>, ${wowExist.name} has been claimed by another Discord user. If you feel this is wrong. Have an administrator run \`!character unclaim ${wowExist.name}-${inputRealm}\``
  }



  // Discord Profile exist? create if needed
  if ( !await DiscordUsers.findOne({ userID: discordUID.id }) ) {
    await DiscordUsers.create({
      userID: discordUID.id,
      userName: discordUID.username
    })
  }

  sails.log.info(inputCharacter)
  sails.log.info(inputRealm)
  var defaultChar = `${wowExist.name.toLowerCase()}-${inputRealm.toLowerCase()}`

  // Character exists and Discord profile created if needed
  await DiscordUsers.update({ userID: discordUID.id }).set({
    defaultCharacter: defaultChar
  })
  return `<@${discordUID.id}>, Saved! Your default character is now ${wowExist.name}`

};
