const mongo = require("../../mongo.js")
const { execute } = require("./ping.js")
const serverSettingsSchema = require("../../Schema/serversettings")
const message = require("../../events/guild/message")
module.exports = {
    name: setprefix,
    description: "Set the server Prefix",
    help: "Change the commandprefix of the bot for the server",
    async execute(client, message, args) {
        await mongo().then(async mongoose => {
            try {
                const guildId = message.guild.guildId
                const NewPrefix = args[0]

                await commandPrefixSchema.findOneAndUpdate({
                    _id: guildId
                }, {
                    _id: guildId,
                    prefix: NewPrefix
                }, {
                    upsert: true
                })

                message.channel.send(`${message.author} changed the prefix to ${NewPrefix}`)

                message.updateCache(guildId, NewPrefix)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}