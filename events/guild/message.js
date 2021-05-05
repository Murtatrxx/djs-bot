const prefix = '$';
const util = require("../../Utils/CMDmismatch")

module.exports = (Discord, client, message, validcommand) => {
    let {
        minArgs = 0,
        maxArgs = null
    } = validcommand

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = content.split(/[ ]+/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    args.shift()

    if (args.length < minArgs || (args.content !== null && args.length > maxArgs)) return message.channel.send(util.argumentMismatch)

    if (command) command.execute(client, message, args);
}