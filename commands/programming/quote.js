// @ts-check
const quote = require("../../utils/quotes.json");
const { MessageEmbed } = require('discord.js');
const Canvas = require('canvas');


const font = (c, qte) => {
  const ctx = c.getContext("2d")

  let txt = qte.en.match(/(.|\s){1, 25}/g)?.join("\n"),
  fontSize = 35, measure, height, font = 50

  do {

    measure = ctx.measureText(txt)
    fontSize -= 5

  } while(measure.width > c.width - 300 || measure.height > c.height - 300)

  do font -= 5;
  while (ctx.measureText(qte.author).width > 180)

  height = 410 + (fontSize / 2);

  return { fnt: `${fontSize}px sans-serif`, txt: txt, author: { name: "- " + qte.author, height, fnt: `${font}px sans-serif`} }
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
      fnt,
      txt,
      author
    } = font(canvas, qte)

    ctx.fillStyle = "#111111"

    ctx.font = fnt
    ctx.fillText(txt, canvas.width / 2, canvas.height / 2)
        
    ctx.font = author.fnt
    ctx.fillText(author.name, 600, author.height)


    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .attachFiles([{attachment: canvas.toBuffer(), name: "quote.jpg"}])
      .setImage("attachment://quote.jpg")
    message.ireply("", { embed: embed });
  }
}
