const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "codehelp",
  description: "Helps you with code",
  async execute(client, message, Discord) {
    try {

      const args = message.content.split(/ +/)

      let embed = new MessageEmbed()
        .setTitle("Code Tutor for " + args[1])
        .setDescription("Level " + args[2])

      message.channel.send(embed).catch(e => error.send("Error:" + e.stack));
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}