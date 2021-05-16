const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "codeimage",
  description: "Send you a code themed image",
  help: "See image of coding",
  expArgs: "There will be no arguments needed",
  async execute(client, message, Discord) {
    let images = [
      `${client.user.displayAvatarURL()}`
    ]

    let r = Math.floor(Math.random() * images.length)

    let embed = new MessageEmbed()
      .setTitle("Coding Image")  
      .setImage(images[r])  
      .setColor("PURPLE")

    message.channel.send(embed)
  }
}