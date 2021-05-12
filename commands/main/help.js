const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  async execute(client, message, args) {
    try {

      let commands = await client.commands.map(c => c)
      error.send(JSON.stringify(commands))
      let embed = new MessageEmbed()
        .setTitle(`Help command`)
        .setDescription(client.commands.map(c => `\`${c.name}\` - ${c.description}`).join('\n'))
      for (let cmd of commands) {
        embed.addField(cmd, cmd.help, true)
      }
      message.channel.send(embed).catch(e => error.send("Error:" + e.stack));

    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}
