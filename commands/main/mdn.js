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
module.exports = {
  name: "mdn",
  minArgs: 1,
  maxArgs: 3,
  perms: [""],
  async execute(client, message, args) {
    try {
        const findDoc = async (query, message) => {
            let uri = base +"api/v1/search?"+ encode({ q: query })
            let data = cache.get(uri)
            if (!data) {
                // @ts-ignore
                let res = await fetch(uri).then(res => res.json())
                error.send(JSON.stringify(res)+uri)
                data = res.documents?.[0];
                cache.set(uri, data)
            }

            if (!data) return message.ireply("No docs found for: "+query, { mention: true })

            let pre = data.summary
                .replace(/\s+/g, " ")
                .replace(/\[(.+?)\]\((.+?)\)/g, `[$1](${base}<$2>)`)
                .replace(/`\*\*(.*)\*\*`/g, "**`$!`**")
            
            em.setTitle(data.title)
                .setURL(data.mdn_url)
                .setDescription(pre)

            message.ireply("", { embed: em })
        }
        findDoc(args.join(" ").trim(), message)
    } catch (e) {
        error.send("Errors:" + e.stack)
    }
  },
};
