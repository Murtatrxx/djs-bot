const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "credits",
  description: "Send you developers and info of this bot",
  help: "Sends this command",
  expArgs: "There will be no arguments needed",
  async execute(client, message, args) {
      let embed = new MessageEmbed()
        .setTitle("Developers of This Bot")
        .setDescription("▫ <@756393473430519849> : Project Idea & Programmer")
        .setColor("BLACK")

      message.channel.send(embed);
    }
  }