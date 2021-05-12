const prefix = "?";
const util = require("../../utils/CMDmismatch");

module.exports = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.channel.type === "dm") return;

  const args = message.content.toString().slice(prefix.length).split(/\s+/);
  const cmd = args.shift();

  const command = client.commands.get(cmd);

  if (command) command.execute(client, message, args);
};
