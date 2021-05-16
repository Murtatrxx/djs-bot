const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "codeimage",
  description: "Send you a code themed image",
  help: "See image of coding",
  expArgs: "There will be no arguments needed",
  async execute(client, message, Discord) {
    let images = [
      `https://cdn.discordapp.com/attachments/768767631804071946/843494184048132096/9k.png`,
      "https://cdn.discordapp.com/attachments/768767631804071946/843494884458496050/9k.png",
      "https://cdn.discordapp.com/attachments/768767631804071946/843495028462190633/2Q.png"
    ]

    let r = Math.floor(Math.random() * images.length)

    let embed = new MessageEmbed()
      .setTitle("Coding Image")  
      .setImage(images[r])  
      .setColor("PURPLE")

    message.channel.send(embed)
  }
}