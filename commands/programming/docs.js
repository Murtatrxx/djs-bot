const error = require('../../utils/error')
const fetch = require('node-fetch')

module.exports = {
  name: "docs",
  description: "Search the Discord docs",
  help: "Search the Discord.js Documents for the object you have filled in as Argument",
  expArgs: "<object to be searched>",

  async execute(client, message, args) {
    try {
      if (!args[0]) {
        message.ireply("Send something to search, type `cancel` to cancel. You have 60s.")
        let m = await message.channel.awaitMessages((msg) => msg.author.id === message.author.id, { max: 1, time: 60000 })
        if (!m || m?.first()?.content.toLowerCase() === "cancel") return;
        args = m.first().content.toLowerCase().split(/\s+/)
      }
      let source = args.find(m => /^(--src|-s)\w*$/ig.test(m.trim().toLowerCase()))?.replace(/^(--src|-s)=(\w*)$/, "$2") ?? "stable";
      let poss = ["master", "stable", "collection", "commando", "rpc", "akairo", "akairo-master"]
      if (!poss.includes(source.toLowerCase())) return message.ireply("The source doesn't match the available ones:\n`" + poss.join("` `") + "`");
      fetch(`https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${args[0]}`)
        .then(res => res.json()).catch(e => e.send("Errors: " + e))
        .then(m => {
          message.ireply("", { embed: m })
        }).catch(e => e.send("Errors: " + e))
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
};
