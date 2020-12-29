module.exports = {


  friendlyName: 'Add Character to DB',


  description: 'Addcharacter something.',


  inputs: {
    character: {
      type: 'json'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    for (c of inputs.character){
      sails.log.info(c.name)
      var char = WowCharacters.findOne({
        name: c.name,
        realm: c.realm
      })

    }
  }


};
