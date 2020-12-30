module.exports = function blizzardAPI(sails){
  return {
    initialize: async function(){
      const battleNetWrapper = require('battlenet-api-wrapper');

      const clientId = process.env.API_BLIZZ_CLIENT;
      const clientSecret = process.env.API_BLIZZ_SECRET;

      const bnw = new battleNetWrapper();
      await bnw.init(clientId, clientSecret, 'us', 'en_US');

      sails.blizz = bnw
    }
  }

}
