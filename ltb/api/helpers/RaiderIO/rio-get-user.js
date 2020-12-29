module.exports = {


  friendlyName: 'Rio get user',


  description: '',


  inputs: {
    character: {
      type: 'string'
    },
    realm: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var urllib = require('urllib');
    // TODOconst request = require('request')
    var character = inputs.character
    var realm = inputs.realm
    var raiderio = `https://raider.io/api/v1/characters/profile?region=us&realm=${realm}&name=${character}&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_weekly_highest_level_runs`

    var raidRet = await urllib.request(raiderio, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })



    if (raidRet.status == 200 ){
      var response = JSON.parse(raidRet.data.toString())

      var returnObj = {
        name: response.name,
        realm: response.realm,
        race: response.race,
        class: response.class,
        score: response.mythic_plus_scores_by_season[0].scores.all
      }

      var findUser = await WowCharacters.findOne({
        name: returnObj.name
      })

      if ( findUser != undefined ) {
        await WowCharacters.update(findUser).set({
          class: returnObj.class,
          race: returnObj.race,
          scoreMythic: returnObj.score
        })
      }

      return returnObj
    }

    return JSON.parse(raidRet.data.toString())



  }



};
