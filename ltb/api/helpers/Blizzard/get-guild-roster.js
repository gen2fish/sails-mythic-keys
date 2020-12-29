module.exports = {


  friendlyName: 'Blizzard Get Roster',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    const battleNetWrapper = require('battlenet-api-wrapper');

    const clientId = '';
    const clientSecret = '';

    const bnw = new battleNetWrapper();
    await bnw.init(clientId, clientSecret);

    var characters = await bnw.WowProfileData.getGuildRoster(realmSlug='bloodhoof',guildName='casual-hex')

    var maxChars = []

    for (chars of characters.members){
      if (chars.character.level == 60){

        var char = {
          name: chars.character.name,
          nameSlug: chars.character.name.toLowerCase(),
          realm: chars.character.realm.slug,
          // race: raiderio.race,
          // class: raiderio.class,
          // score: raiderio.score
        }

        var dbChar = await WowCharacters.findOne({
          name: char.name,
          realm: char.realm
        })

        if (dbChar == undefined) {
          await WowCharacters.create({
            name: char.name,
            nameSlug: char.name.toLowerCase(),
            realm: char.realm,
            // class: char.class,
            // race: char.race,
            // scoreMythic: char.score
          })
          sails.log.info(`Created: ${char.name}`)
        } else {
          await WowCharacters.update(dbChar).set(char)
          sails.log.info(`Updated: ${char.name}`)

        }

        // if (dbChar.scoreMythic != char.score) {
        //   await WowCharacters.update({
        //     name: char.name,
        //     realm: char.realm
        //   }).set({
        //     scoreMythic: char.score
        //   })
        // }

        maxChars.push(char)

      }
    }



    return(maxChars.sort(function(a,b){
      return b.score - a.score
    }))
  }


};
