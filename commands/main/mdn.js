// @ts-check
const { MessageEmbed } = require("discord.js");
const error = require('../../utils/error')
const fetch = require("node-fetch")
const { encode } = require("querystring")

const cache = new Map()
const base = "https://developer.mozilla.org/"
const em = new MessageEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setAuthor("mdn docs", "https://developer.mozilla.org/favicon-48x48.97046865.png", "https://developer.mozilla.org/")
module.exports = {
  name: "mdn",
  minArgs: 1,
  maxArgs: 3,
  perms: [""],
  async execute(client, message, args) {
    try {
        if (!args[0]) {
            message.ireply("Send something to search, type `cancel` to cancel. You have 60s.")
            let m = await message.channel.awaitMessages((msg) => msg.author.id === message.author.id, { max: 1, time: 60000 })
            if (!m || m.first().content.toLowerCase() === "cancel") return;
            args = m.first().content.toLowerCase().split(/\s+/)
        }
        const findDoc = async (query, message) => {
            let uri = base +"api/v1/search?"+ encode({ q: query })
            let data = cache.get(uri)
            if (!data) {
                // @ts-ignore
                let res = await fetch(uri).then(res => res.json()).catch(e => error.send("Error: "+e.stack))
                data = res.documents?.[0];
                cache.set(uri, data)
            }

            if (!data) return message.ireply("No docs found for: "+query, { mention: true })

            let pre = data.summary
                .replace(/\s+/g, " ")
                .replace(/\[(.+?)\]\((.+?)\)/g, `[$1](${base}<$2>)`)
                .replace(/`\*\*(.*)\*\*`/g, "**`$!`**")
            
            em.setTitle(data.title)
                .setURL(base+data.mdn_url)
                .setDescription(pre.substr(0, 2000))

            message.ireply("", { embed: em }).catch(e => error.send("Error: "+e.stack))
        }
        findDoc(args.join(" ").trim(), message)
    } catch (e) {
        error.send("Errors:" + e.stack)
    }
  },
};
