const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ping',
    des: 'Pong..!',
    async run(client, interaction){
        try {
            interaction.reply("WS ping: "+client.ws.ping+"ms", { flags: 64 })
        } catch (e) {
            error.send("Errors:" + e.stack)
        }
    }

}