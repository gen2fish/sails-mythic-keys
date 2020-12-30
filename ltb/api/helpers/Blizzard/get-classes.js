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

    const playableClassIndex = await sails.blizz.WowGameData.getPlayableClassIndex();
    var playableClass = {}

    for ( r of playableClassIndex.classes ){
      var findClass = await WowClasses.findOne({
        name: r.name
      })

      if ( findClass == undefined ) {
        await WowClasses.create({
          name: r.name,
          wowID: r.id
        })
      } else {
        await WowClasses.update({
          name: r.name
        }).set({
          name: r.name,
          wowID: r.id
        })
      }
    }

    return await WowClasses.find()

  }
}
