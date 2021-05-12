const { MessageEmbed } = require("discord.js");
const error = require('../../utils/error')

module.exports = {
  name: "ping",
  description: "a ping command",
  help: "Run a ping command to get the latency",
  expArgs: "There will be no arguments needed",
  minArgs: 0,
  maxArgs: 0,
  perms: ["ADMINISTRATOR"],
  execute(client, message, args) {
    try {
      message.channel.send("Pong!").then((m) => {
        let ping = m.createdTimestamp - message.createdTimestamp;
        const ememem = new MessageEmbed().setColor("PURPLE").addFields({
          name: `**:hourglass: | Ping: ${ping}ms **`,
          value: `**:heartbeat: | API: ${client.ws.ping}ms **`,
        });
        if (ping >= 1000) return m.edit("", { embed: errembed });
        m.edit("", { embed: ememem }).catch(e => error.send("Error:" + e.stack));
      }).catch(e => error.send("Error:" + e.stack));
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
};
