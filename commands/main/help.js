const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  async execute(client, message, args) {
    try {

      client.commands.map(c => {
        for (let i = 0; i < c.length; i++) {
          let embed = new MessageEmbed()
            .setTitle(`Help command`)
            .setDescription(client.commands.map(c => `\`${c.name}\` - ${c.description}`).join('\n'))
            .addField(c[i], `test`, true)

          message.channel.send(embed).catch(e => error.send("Error:" + e.stack));
        }
      })
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}
