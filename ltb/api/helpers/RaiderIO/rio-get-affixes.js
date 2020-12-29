module.exports = {


  friendlyName: 'RaiderIO get current affixes',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    var urllib = require('urllib');
    var raiderio = 'https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en'

    var raidRet = await urllib.request(raiderio, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return JSON.parse(raidRet.data.toString())


  }


};
