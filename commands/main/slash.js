const mongo = require("../../mongo.js")
const { execute } = require("./ping.js")
const serverSettingsSchema = require("../../Schema/serversettings")
require('../../utils/inline')

module.exports = {
    name: "slash",
    description: "Toggles the slash to on/off",
    help: "Change the commandprefix of the bot for the server",
    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("You're not authorized to use this command\nYou need Admin perms.")
        await mongo().then(async mongoose => {
            try {
                const guildId = message.guild.id
                let slash = client.cache.get(message.guild.id)?.slash

                await serverSettingsSchema.findOneAndUpdate({
                    _id: guildId
                }, {
                    _id: guildId,
                    slash: slash
                }, {
                    upsert: true
                })

                message.ireply(`${message.author} turned slash command ${(slash ? "on" : "off")}`)
                client.cache.get(guildId).slash = slash

               } finally {
            }
        })
    }
}
