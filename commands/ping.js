const {MessageEmbed} = require('discord.js')
module.exports = {
	name: 'ping',
    execute(client, message, Discord) {
        message.channel.send("Pong!").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            let errembed = new MessageEmbed().setColor("RED").setTitle(":x: High ping has been detected on your server!").setDescription("You can try changing the region of the server to fix it").addField(":hourglass_flowing_sand: Ping:", ping + " ms", true).addField(":large_blue_diamond: Region:", message.guild.region, true).addField("Harmless Level:", ":yellow_circle::yellow_circle::yellow_circle::white_circle::white_circle: (Middle)");
            const ememem = new MessageEmbed().setColor('RED').addFields({ name: `**: hourglass: | Ping: ${ping}ms **`, value: `**: heartbeat: | API: ${bot.ws.ping}ms **` });
            m.delete();
            if (ping >= 1000) return message.channel.send(errembed)
            message.channel.send(ememem);
        });
    }
}