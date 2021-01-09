module.exports = {


  friendlyName: 'Blizzard Get Roster',


  description: '',


  inputs: {
    character: { type: 'string' },
    realm: { type: 'string' }
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    try {
      sails.log.info("BLIZZARD | Sending query to Blizz")
      const getCharacterSummary = await sails.blizz.WowProfileData.getCharacterSummary(realmSlug=inputs.realm.toLowerCase(),characterName=inputs.character.toLowerCase());
      sails.log.info("BLIZZARD | Character Exists")

      var char = {
        name: getCharacterSummary.name,
        nameSlug: getCharacterSummary.name.toLowerCase(),
        realm: getCharacterSummary.realm.slug,
        class: getCharacterSummary.character_class.name,
        race: getCharacterSummary.race.name,
        guild: getCharacterSummary.guild.name,
        wowID: getCharacterSummary.id
      }

      if (!await WowCharacters.findOne({ wowID: char.wowID })) {
        await WowCharacters.create(char).fetch()
      } else {
        await WowCharacters.update({ wowID: char.wowID }).set(char)
      }


      return char
    } catch {
      return undefined
    }
  }
}
