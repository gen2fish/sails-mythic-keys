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


    const mythicDungeonIndex = await sails.blizz.WowGameData.getMythicKeystoneDungeonsIndex();

    const dungeonAlias = {
      'The Necrotic Wake':
        [
          'nw',
          'necro',
          'wake',
          'necrotic wake'
        ],
      'Spires of Ascension':
        [
          'spires',
          'spire',
          'soa',
          'spires of ascension'
        ],
      'De Other Side':
        [
          'dos',
          'de',
          'side',
          'other',
          'de other side'
        ],
      'Halls of Atonement':
        [
          'ha',
          'halls',
          'hall',
          'hoa',
          'halls of atonement'
        ],
      'Mists of Tirna Scithe':
        [
          'mists',
          'mots',
          'tirna',
          'scithe',
          'mists of tirna scithe'
        ],
      'Plaguefall':
        [
          'pf',
          'plague',
          'plaguefall'
        ],
      'Sanguine Depths':
        [
          'sd',
          'sanguine',
          'depths',
          'sanguine depths'
        ],
      'Theater of Pain':
        [
          'top',
          'theater',
          'pain',
          'theater of pain'
        ],
    }



    for ( r of mythicDungeonIndex.dungeons ){
      var findRace = await WowDungeons.findOne({
        name: r.name
      })

      if ( findRace == undefined ) {
        await WowDungeons.create({
          name: r.name,
          wowID: r.id,
          alias: dungeonAlias[r.name]
        })
      } else {
        await WowDungeons.update({
          name: r.name
        }).set({
          name: r.name,
          wowID: r.id,
          alias: dungeonAlias[r.name]
        })
      }
    }

    return await WowDungeons.find()


  }
}
