const { MessageEmbed } = require("discord.js");
const error = require('../../utils/error')

module.exports = {
  name: "ping",
  description: "a ping command",
  help: "Run a ping command to get the latency",
  expArgs: "",
  execute(client, message, args) {
    try {
      message.channel.send("Pong!").then((m) => {
        let ping = m.createdTimestamp - message.createdTimestamp;
        const ememem = new MessageEmbed().setColor("PURPLE").setTitle('Stats').setURL('https://discord.com/api/oauth2/authorize?client_id=838864249958301706&permissions=8&scope=applications.commands%20bot').addFields({
          name: `**:hourglass: | Ping: ${ping}ms **`,
          value: `**:heartbeat: | API: ${client.ws.ping}ms **`,
        }).setDescription('Guilds: '+client.guilds.cache.size);
        if (ping >= 1000) return m.edit("", { embed: errembed });
        m.edit("", { embed: ememem }).catch(e => error.send("Error:" + e.stack));
      }).catch(e => error.send("Error:" + e.stack));
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
};
