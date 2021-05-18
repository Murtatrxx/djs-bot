const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');


module.exports = {
  name: "help",
  description: "<command-name>",
  help: "Sends this help command",
  expArgs: "<command>",
  async execute(client, message, args) {
    const result = await serverSettingsSchema.findOne({ _id: message.guild.id });
    const prefix = result.prefix
    try {
      let embed = new MessageEmbed()
        .setTitle(`Help command`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setTimestamp()
        .setDescription(client.commands.map(c => `\`${prefix}${c.name}\` - ${c.description}`).join('\n'))
      if (!args[0]) return message.ireply("", { embed: embed }).catch(e => error.send("Error:" + e.stack))
      let cmd = client.commands.get(args[0].toLowerCase())
      if (!cmd) {
        embed.setColor("RED")
          .setDescription("Requested command was not found")
          .setTitle("404 Not Found")
        return message.ireply("", { embed: embed, mention: true })
      } else {
        embed.setTitle(cmd.name)
          .setDescription(cmd.help)
        if (cmd.expArgs) embed.addFields({ name: 'Expected args', value: `\`\`\`?${cmd.name} ${cmd.expArgs}\`\`\`` })
        message.ireply("", { embed: embed })
      }


    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}
