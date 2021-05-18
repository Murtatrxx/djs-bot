module.exports = {
  name: "vote",
  description: "a vote command",
  help: "Run this command to vote the bot",
  expArgs: "<rate(1-5)> <reason>",
  execute(client, message, args) {
    if(!args[0]) return message.channel.send("Please vote the bot correctly")

    message.channel.send("Thanks for voting, your answers will be sent to my developers.")

    let c = client.channels.cache.get("839102795327864855")

    c.send(`There is a vote from ${message.author.tag}: \n Rate: ${args[0]} \n reason: ${args.splice(1).join(" ")}`);
  }
}