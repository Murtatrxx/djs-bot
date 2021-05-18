const mongo = require("../../mongo.js")
const { execute } = require("./ping.js")
const serverSettingsSchema = require("../../Schema/serversettings")
const messagefile = require("../../events/guild/message")
module.exports = {
    name: "setprefix",
    description: "Set the server Prefix",
    help: "Change the commandprefix of the bot for the server",
    async execute(client, message, args) {
        await mongo().then(async mongoose => {
            try {
                const guildId = message.guild.id
                const NewPrefix = args[0]

                await serverSettingsSchema.findOneAndUpdate({
                    _id: guildId
                }, {
                    _id: guildId,
                    prefix: NewPrefix
                }, {
                    upsert: true
                })

                message.channel.send(`${message.author} changed the prefix to ${NewPrefix}`)

                messagefile.updateCache(guildId, NewPrefix)
            } finally {
            }
        })
    }
}
