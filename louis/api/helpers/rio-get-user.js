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
    var raiderio = `https://raider.io/api/v1/characters/profile?region=us&realm=${realm}&name=${character}&fields=mythic_plus_weekly_highest_level_runs`

    var raidRet = await urllib.request(raiderio, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return JSON.parse(raidRet.data.toString())



  }



};
