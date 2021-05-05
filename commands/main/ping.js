const { MessageEmbed } = require('discord.js')
module.exports = {

}

module.exports = {
    name: 'ping',
    minArgs: 0,
    maxArgs: 0,
    execute(client, message, args) {
        message.channel.send("Pong!").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            const ememem = new MessageEmbed()
                .setColor('PURPLE').addFields({ name: `**:hourglass: | Ping: ${ping}ms **`, value: `**:heartbeat: | API: ${client.ws.ping}ms **` });
            m.delete();
            if (ping >= 1000) return message.channel.send(errembed)
            message.channel.send(ememem);
        });
    }
}