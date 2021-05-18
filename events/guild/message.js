module.exports = (client, message) => {

  const prefix = client.cache.get(message.guild.id)?.prefix || "?"
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.channel.type === "dm") return;

  const args = message.content.toLowerCase().slice(prefix.length).split(/\s+/);
  const cmd = args.shift();

  const command = client.commands.get(cmd);

  if (command) return command.execute(client, message, args);
  if (/<@!?>/.test(message.content)) message.ireply(`My prefix is: \`${client.cache.get(message.guild.id)?.prefix ?? "?"}\``)
};