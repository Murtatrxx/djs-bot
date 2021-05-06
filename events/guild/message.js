const prefix = "$";
const util = require("../../Utils/CMDmismatch");

module.exports = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.toLowerCase().slice(prefix.length).split(/\s+/);
  const cmd = args.shift();

  const command = client.commands.get(cmd);

  if (command) command.execute(client, message, args);
};
