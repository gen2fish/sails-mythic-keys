/**
 * RaiderioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  affixes: async function(req, res) {
    res.send(await sails.helpers.rioGetAffixes())

  },

  character: async function(req, res) {

    const cdata = await sails.helpers.RaiderIO.rioGetUser(
      character=req.query.character,
      realm=req.query.realm
    );

    res.send(cdata)
  }
};
