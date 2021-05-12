const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  async execute(client, message, args) {
    try {
      for (let i = 0; i < client.commands.length; i++) {
        let embed = new MessageEmbed()
          .setTitle(`Help command`)
          .setDescription(`Use the reactions below for more indepth help`)
          .addField(client.commands[i], 'test', true)

        message.channel.send(embed).catch(e => error.send("Error:" + e.stack));
      }
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}
