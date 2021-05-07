const error = require("../../utils/error.js");
const { MessageEmbed } = require('discor.js');

module.exports = {
  name: "codehelp",
  async execute(client, message, Discord) {
    const args = message.content.split(/ +/)

    let embed = new MessageEmbed()
      .setTitle("Code Tutor for " + args[1])
      .setDescription("Level " + args[2])
      
    message.channel.send(embed).catch(e => error.send("Error:"+e.stack));
  },
}