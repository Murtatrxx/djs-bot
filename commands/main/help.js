const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');
const prefix = '?'

module.exports = {
  name: "help",
  description: "Sends this message",
  help: "Sends this help command",
  expArgs: "There will be no arguments needed",
  async execute(client, message, args) {
    try {
      let embed = new MessageEmbed()
        .setTitle(`Help command`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setDescription(client.commands.map(c => `\`${prefix}${c.name}\` - ${c.description}`).join('\n'))
      message.channel.send(embed).catch(e => error.send("Error:" + e.stack));

    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}
