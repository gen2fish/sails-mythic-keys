module.exports = {


  friendlyName: 'Set realm',


  description: '',


  inputs: {
    realm: {
      type: 'json',
      description: 'Default Realm'
    },
    discordUID: {
      type: 'json',
      description: 'Discord UID'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    realmList = [
      'bloodhoof',
      'duskwood'
    ]
    // TODO
    /*
    Get user
    add if needed
    set realm
    return success or fail
    */
    args = inputs.realm
    rtnMsg = ''
    if (args[0] == 'set'){
      realm = args[1]
    } else {
      realm = args[0]
    }

    if(!realmList.includes(realm.toLowerCase())){
      rtnMsg = `Invalid Realm \`${realm}\``
      return rtnMsg
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

    await DiscordUsers.update(discordUser).set({
      defaultRealm: realm
    })

    return `Default realm set to ${realm}`
  }


};
