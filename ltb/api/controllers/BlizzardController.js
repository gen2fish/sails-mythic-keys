/**
 * BlizzardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  guildRoster: async function (req, res) {

    var roster = await sails.helpers.blizzard.getGuildRoster();
    res.send(roster)
  },

  populate: async function ( req, res ) {
    var wowClasses = await sails.helpers.blizzard.getClasses()
    var wowRaces = await sails.helpers.blizzard.getRaces()
    var wowDungeons = await sails.helpers.blizzard.getDungeons()

    res.send([wowClasses,
      wowRaces,
      wowDungeons])
  }
};
