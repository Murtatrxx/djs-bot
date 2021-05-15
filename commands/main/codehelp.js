const error = require("../../utils/error.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "codehelp",
  description: "Helps you with code",
  help: "Get help with coding",
  expArgs: "<language> <level>",
  async execute(client, message, Discord) {
    try {
      const html_emoji = client.emojis.cache.get("843196462337622087")
      const CSS_emoji = client.emojis.cache.get("843196462329364490")
      const javascript_emoji = client.emojis.cache.get("843196462304854016")


      const selectorembed = new MessageEmbed()

        .setTitle("Code Tutorial")
        .setDescription("Select a language to start learning!")
        .addField("Options:", `HTML:\nCSS:\nJavascript:\nSASS\nIntro to web design`)

      message.channel.send(selectorembed).then(async embed => {
        await embed.react(html_emoji);
        await embed.react(CSS_emoji);
        await embed.react(javascript_emoji);
      }).catch(e => error.send("Error:" + e.stack));
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
}