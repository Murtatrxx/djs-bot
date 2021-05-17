const { MessageEmbed } = require("discord.js");
const error = require('../../utils/error')
const fetch = require('node-fetch')

module.exports = {
  name: "npm",
  description: "a ping command",
  help: "Run a ping command to get the latency",
  expArgs: "<Object to be searched>",
  async execute(client, message, args) {
    try {
      if (!args[0]) {
        message.ireply("Send something to search, type `cancel` to cancel. You have 60s.")
        let m = await message.channel.awaitMessages((msg) => msg.author.id === message.author.id, { max: 1, time: 60000 })
        if (m?.first()?.content.toLowerCase() === "cancel") return;
        args = m.first().content.toLowerCase().split(/\s+/)
      }
      fetch('https://registry.npmjs.org/'.concat(args[0])).then(res => res.json()).then(m => {
        
        let em = new MessageEmbed()
          .setTitle('404 Not Found')
          .setColor("RED")
          .setDescription("Your query: \""+args[0]+"\" was not found on NPM")
          .setTimestamp()

        if (m.error) return message.ireply("", { embed: em })

        let {
          name,
          author = {},
          repository = {},
          homepage,
          license,
          description,
          "dist-tags" : dtags = {},
          _id,
          time
        } = m
        time = Object.values(time)

        em.setTitle(name+"@"+dtags.latest)
          .setColor("RED")
          .setDescription(description)
          .setURL("https://npmjs.com/"+_id)
          .setTimestamp()
        if (homepage) em.addFields({ name: 'Home page', value: homepage })
        if (license) em.addFields({ name: 'License', value: license })
        if (time.length) em.addFields({ name: 'Last Publish', value: time[time.length - 1] })
        message.ireply("", { embed: em })
      })
    } catch (e) {
      error.send("Errors:" + e.stack);
    }
  },
};
