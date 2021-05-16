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
    description: "Search MDN docs",
    help: "Search the MDN documents for the object you have filled in as Argument",
    expArgs: "<object to be searched>",
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                message.ireply("Send something to search, type `cancel` to cancel. You have 60s.")
                let m = await message.channel.awaitMessages((msg) => msg.author.id === message.author.id, { max: 1, time: 60000 })
                if (!m || m.first().content.toLowerCase() === "cancel") return;
                args = m.first().content.toLowerCase().split(/\s+/)
            }
            const findDoc = async (query, message) => {
                let uri = base + "api/v1/search?" + encode({ q: query })
                let data = cache.get(uri)
                if (!data) {
                    // @ts-ignore
                    let res = await fetch(uri).then(res => res.json()).catch(e => error.send("Error: " + e.stack))
                    data = res.documents;
                    cache.set(uri, data)
                }

                if (!data?.length) return message.ireply("No docs found for: " + query, { mention: true })

                let pre = data[0].summary
                    .replace(/\s+/g, " ")
                    .replace(/\[(.+?)\]\((.+?)\)/g, `[$1](${base}<$2>)`)
                    .replace(/`\*\*(.*)\*\*`/g, "**`$!`**")

                em.setTitle(data[0].title)
                    .setURL(base + data[0].mdn_url)
                    .setDescription(pre.substr(0, 2000))
                if (data.length > 1) em.addFields({ name: 'Did you mean?', value: data.slice(1, 6).map(m => `[${m.title}](${base + m.mdn_url})`).join('\n') })

                message.ireply("", { embed: em }).catch(e => error.send("Error: " + e.stack))
            }
            findDoc(args.join(" ").trim(), message)
        } catch (e) {
            error.send("Errors:" + e.stack)
        }
    },
};
