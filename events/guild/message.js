const prefix = '$';
const util = require("../../Utils/CMDmismatch")

module.exports = (client, message) => {
    //let { minArgs = 0 } = validcommand
    //let { maxArgs = null } = validcommand
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const { member, content } = message
    const args = content.toLowerCase().slice(prefix.length).split(/\s+/);
    const cmd = args.shift();

    const command = client.commands.get(cmd);

    //args.shift()

    //if (args.length < minArgs || (args.content !== null && args.length > maxArgs)) return message.channel.send(util.argumentMismatch)

    if (command) command.execute(client, message, args);
    console.log(command)
}