const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  async execute(client, message, args) {
    try {

      let embed = new MessageEmbed()
        .setTitle("Code Tutor for " + args[0])
        .setDescription("Level " + args[1])

      message.channel.send(embed).catch(e => error.send("Error:" + e.stack));
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}
