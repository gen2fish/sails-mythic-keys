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

    await sails.helpers.blizzard.getDungeons()
    const playableClassesIndex = await WowClasses.find();
    const playableRacesIndex = await WowRaces.find();

    var playableClasses = {}
    var playableRaces = {}

    for ( r of playableRacesIndex ){
      playableRaces[r.wowID] = r.name
    }

    for ( c of playableClassesIndex ){
      playableClasses[c.wowID] = c.name
    }
    sails.log.info(playableRaces)
    var characters = await sails.blizz.WowProfileData.getGuildRoster(realmSlug=sails.defaultrealm.toLowerCase(),guildName='casual-hex')

    var maxChars = []

    for (chars of characters.members){
      if (chars.character.level == 60){
        sails.log.info(chars.character.id)
        var char = {
          name: chars.character.name,
          wowID: chars.character.id,
          nameSlug: chars.character.name.toLowerCase(),
          realm: chars.character.realm.slug,
          class: playableClasses[chars.character.playable_class.id],
          race: playableRaces[chars.character.playable_race.id],
          guild: 'Casual Hex'
        }

        var dbChar = await WowCharacters.findOne({
          wowID: char.wowID
        })

        if (dbChar == undefined) {
          await WowCharacters.create(char)
        } else {
          await WowCharacters.update({ wowID: char.id }).set(char)
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
