const fetch = require('node-fetch')

module.exports = {
  name: "vote",
  description: "a vote command",
  help: "Run this command to vote for this bot",
  expArgs: "",
  execute(client, message, args) {
    
    message.channel.send("Thanks for voting,")

    let c = client.channels.cache.get("839102795327864855")

    c.send(`There is a vote from ${message.author.tag}: \n Rate: ${args[0]} \n reason: ${args.splice(1).join(" ")}`);
  }
}