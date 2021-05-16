const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "credits",
  description: "Send you developers and info of this bot",
  help: "Sends this command",
  expArgs: "There will be no arguments needed",
  async execute(client, message, args) {
      let embed = new MessageEmbed()
        .setTitle("Developer")

      message.channel.send(embed);
    }
  }