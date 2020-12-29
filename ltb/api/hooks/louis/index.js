module.exports = function discordBot(sails) {
  return {
    initialize: async function() {
      const Discord = require('discord.js')
      const bot = new Discord.Client();

      const TOKEN = ''

      bot.login(TOKEN)
      bot.commands = new Discord.Collection();
      const botCommands = require('./commands.js');

      Object.keys(botCommands).map(key => {
        bot.commands.set(botCommands[key].name, botCommands[key]);
      });

      bot.on('message', msg => {
        const args = msg.content.split(/ +/);
        var command = args.shift().toLowerCase();
        if (command.startsWith("!")) {
          command = command.replace("!", "")
        } else {
          return;
        }
        console.info(`Called command: ${command}`);

        if (!bot.commands.has(command)) return;

        try {

          bot.commands.get(command).execute(msg, args);
        } catch (error) {
          console.error(error);
          msg.reply('there was an error trying to execute that command!');
        }
      });

      sails.discordbot = bot
    }
  }
}
