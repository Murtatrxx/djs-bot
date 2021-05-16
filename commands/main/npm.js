const { MessageEmbed } = require("discord.js");
const error = require('../../utils/error')
const fetch = require('node-fetch')

module.exports = {
  name: "npm",
  description: "a ping command",
  help: "Run a ping command to get the latency",
  expArgs: "<Object to be searched>",
  execute(client, message, args) {
    try {
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
          _id
        } = m

        em.setTitle(name)
        .setColor("RED")
        .setURL("https://npmjs.com/"+_id)
        .setTimestamp()
        .setAuthor(author.name ?? "Unknown person")
        .addFields({ name: 'Home page'})
        message.ireply("", { embed: em })
      })
    } catch (e) {
      error.send("Errors:" + e.stack);
    }
  },
};
