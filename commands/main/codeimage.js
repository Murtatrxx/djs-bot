const { MessageEmbed , MessageAttachment } = require('discord.js');

module.exports = {
  name: "codeimage",
  description: "Send you a code themed image",
  help: "See image of coding",
  expArgs: "There will be no arguments needed",
  async execute(client, message, Discord) {
    let images = [
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f302109ffad89f9130e07db%2F960x0.jpg%3FcropX1%3D0%26cropX2%3D4800%26cropY1%3D243%26cropY2%3D2943&imgrefurl=https%3A%2F%2Fwww.forbes.com%2Fsites%2Fenriquedans%2F2020%2F08%2F09%2Fcould-the-no-code-movement-put-programmers-out-of-ajob%2F&tbnid=8LpHX9918c2YXM&vet=12ahUKEwi80ZPBos7wAhXGuKQKHZ13DTUQMygGegUIARDCAQ..i&docid=Gd-nkZUGPhEUWM&w=960&h=540&q=code&ved=2ahUKEwi80ZPBos7wAhXGuKQKHZ13DTUQMygGegUIARDCAQ"
    ]

    let r = Math.floor(Math.random() * images.length)

    let i = new MessageAttachment(images[r] , "image.png")

    let embed = new MessageEmbed()
      .setTitle("Coding Image")  
      .setImage(r)  
      .setColor("PURPLE")

    message.channel.send(embed)
  }
}