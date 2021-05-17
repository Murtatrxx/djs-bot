// @ts-check
const quote = require("../../utils/quotes.json");
const { MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
const errors = require("../../utils/error")


const font = (c, qte) => {
  const ctx = c.getContext("2d")

  let txt = qte.en.match(/ ?(.|\s){1,30}( |\s)/g),
  fontSize = 45, measure1, measure2, height = 450, font = 50

  return {
    txt:{
      fnt: `${fontSize}px sans-serif`,
      text: txt.join("\n"),
      height: 400 - (25 * txt.length),
    },
    author: {
      height: 450 + (25 * txt.length),
      fnt: `${font}px sans-serif`
    }
  }
}

module.exports = {
  name: "quote",
  description: "See a quote of pro coders",
  help: "This command will send you a random quote",
  expArgs: "There will be no arguments needed",
  async execute(client, message, args) {

    let qte = quote[Math.floor(Math.random() * quote.length)]

    while(qte.en?.length > 300) qte = quote[Math.floor(Math.random() * quote.length)]
    
    const canvas = Canvas.createCanvas(800, 800);
    const ctx = canvas.getContext('2d');
    
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#FFC300"
    ctx.fill()
    
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    let {
      txt,
      author
    } = font(canvas, qte)

    ctx.fillStyle = "#111111"

    ctx.font = txt.fnt
    ctx.fillText(txt.text, 50, txt.height)
        
    ctx.font = author.fnt
    ctx.fillText("- "+qte.author, 400 - ((qte.author.length) * 10), author.height)


    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .attachFiles([{attachment: canvas.toBuffer(), name: "quote.jpg"}])
      .setImage("attachment://quote.jpg")
    message.ireply("", { embed: embed });
  }
}
