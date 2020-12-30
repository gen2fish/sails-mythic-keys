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

    const playableRacesIndex = await sails.blizz.WowGameData.getPlayableRaceIndex();
    var playableRaces = {}

    for ( r of playableRacesIndex.races ){
      var findRace = await WowRaces.findOne({
        name: r.name
      })

      if ( findRace == undefined ) {
        await WowRaces.create({
          name: r.name,
          wowID: r.id
        })
      } else {
        await WowRaces.update({
          name: r.name
        }).set({
          name: r.name,
          wowID: r.id
        })
      }
    }

    return await WowRaces.find()

  }
}
