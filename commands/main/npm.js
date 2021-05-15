const { MessageEmbed } = require("discord.js");
const error = require('../../utils/error')
const fetch = require('node-fetch')

module.exports = {
  name: "npm",
  description: "a ping command",
  help: "Run a ping command to get the latency",
  expArgs: "<Object to be searched>",
  minArgs: 0,
  maxArgs: 0,
  perms: [""],
  execute(client, message, args) {
    try {
      fetch('https://registry.npmjs.org/' + args[0]).then(m => {
        let data = JSON.stringify(m);
        error.send(m)
        error.send(data)
        message.reply(data, { split: { char: '' } })
      })
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
};
