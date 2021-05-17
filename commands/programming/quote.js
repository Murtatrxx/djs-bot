// @ts-check
const quote = require("../../utils/quotes.json");
const { MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
const errors = require("../../utils/error")


const font = (c, qte) => {
  const ctx = c.getContext("2d")

  let txt = qte.en.match(/ ?(.|\s){1,30}( | \s)/g).join("\n"),
  fontSize = 45, measure1, measure2, height, font = 50

  do {

    ctx.font = `${fontSize -= 5}px sans-serif`
    measure1 = ctx.measureText(txt)

  } while(measure1.width > c.width - 200 || measure1.height > c.height - 200)

  do {
    ctx.font = `${font -= 5}px sans-serif`
    measure2 = ctx.measureText(qte.author)
  }
  while (measure2.width > 400)

  height = 500 - (measure2.height / 2);
  errors.send(JSON.stringify({measure1, measure2}))


  return {
    txt:{
      fnt: `${fontSize}px sans-serif`,
      text: txt,
      height: 400 - (measure1.height / 2),
      width: 400 - (measure1.width / 2)
    },
    author: {
      height,
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
    ctx.fillText(txt.text, txt.width, txt.height)
        
    ctx.font = author.fnt
    ctx.fillText(qte.author, 400, author.height)


    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .attachFiles([{attachment: canvas.toBuffer(), name: "quote.jpg"}])
      .setImage("attachment://quote.jpg")
    message.ireply("", { embed: embed });
  }
}
