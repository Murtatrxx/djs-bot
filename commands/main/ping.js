const { MessageEmbed } = require("discord.js");
const error = require('../../utils/error')

module.exports = {
  name: "ping",
  minArgs: 0,
  maxArgs: 0,
  perms: ["ADMINISTRATOR"],
  execute(client, message, args) {
    message.channel.send("Pong!").then((m) => {
      let ping = m.createdTimestamp - message.createdTimestamp;
      const ememem = new MessageEmbed().setColor("PURPLE").addFields({
        name: `**:hourglass: | Ping: ${ping}ms **`,
        value: `**:heartbeat: | API: ${client.ws.ping}ms **`,
      });
      if (ping >= 1000) return m.edit("", {embed: errembed});
      m.edit("", {embed: ememem}).catch(e => error.send("Error:"+e.stack));
    }).catch(e => error.send("Error:"+e.stack));
  },
};
