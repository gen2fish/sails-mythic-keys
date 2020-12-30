module.exports = {


  friendlyName: 'Get dungeon',


  description: '',


  inputs: {
    term: {type: 'json' }
  },


  exits: {

    success: {
      outputFriendlyName: 'Dungeon',
    },

  },


  fn: async function (inputs) {

    // Get dungeon.
    var search = inputs.term

    var dungeon = await findDungeon(search)
    var keyLevel = await findLevel(search)


    return {
      dungeon: dungeon,
      level: keyLevel
    };

  }


};

findDungeon = async function(arr) {

  var dungeonList = await WowDungeons.find()
  for (d of dungeonList) {

    for ( a of arr){
      if (d.alias.includes(a.toLowerCase())) {
        return d
      }
    }
  }

  return undefined
};

findLevel = async function(arr) {

  var search = arr.join("")

  var numb = search.match(/\d/g);

  try {
    numb = numb.join("");
  } catch {
    numb = undefined
  }

  return numb
}
