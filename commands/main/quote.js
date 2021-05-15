const quote = require("../../utils/quotes.json");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "quote",
  description: "See a quote of pro coders",
  help: "This command will send you a random quote",
  expArgs: "There will be no arguments needed",
  async execute(client, message, args) {
    let qte = quote[Math.floor(Math.random() * quote.length)]

    let embed = new MessageEmbed()
      .setTitle("Random Quote")
      .setDescription(`**|** ${qte.en} - ${qte.author}`)

    message.channel.send(embed);
  }
}