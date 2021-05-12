const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  async execute(client, message, args) {
    try {

      let commands = await client.commands.map()
      for (let i = 0; i < commands.length; i++) {
        let embed = new MessageEmbed()
          .setTitle(`Help command`)
          .setDescription(client.commands.map(c => `\`${c.name}\` - ${c.description}`).join('\n'))

        embed.addField(commands[i])

        message.channel.send(embed).catch(e => error.send("Error:" + e.stack));
      }
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}
