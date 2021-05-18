const mongo = require("../../mongo")
const serverSettingsSchema = require("../../Schema/serversettings")
module.exports = (client, guild) => {
    let data = []
    client.scmds.each(m => {
        data.push({
            name: m.name.toLowerCase(),
            description: m.des,
            options: m.options
        })
    })
    client.api.applications(client.user.id).guilds(guild.id).commands.put({ data: data })
    client.cache.set(guild.id, { _id: guild.id, prefix: "?", slash: true})
};