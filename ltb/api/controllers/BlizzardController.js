/**
 * BlizzardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  guildRoster: async function (req, res) {
    sails.log.info(sails.helpers)
    var roster = await sails.helpers.blizzard.getGuildRoster();
    res.send(roster)
  }
};
