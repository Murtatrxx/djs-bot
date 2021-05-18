const GPrefix = "?";
const util = require("../../utils/CMDmismatch");
const guildPrefixes = {}
const mongo = require("../../mongo")
const serverSettingsSchema = require("../../Schema/serversettings")
module.exports = (client, message) => {

  const prefix = guildPrefixes[guild.id] || GPrefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.channel.type === "dm") return;

  const args = message.content.toLowerCase().slice(prefix.length).split(/\s+/);
  const cmd = args.shift();

  const command = client.commands.get(cmd);

  if (command) command.execute(client, message, args);
};

module.exports.loadPrefix = async (client) => {
  await mongo().then(async (mongoose) => {
    try {
      for (const guild of client.guilds.cache) {
        const result = await serverSettingsSchema.findOne({ _id: guild[1].id });
        guildPrefixes[guild[1].id] = result.prefix
      }
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.updateCache = (guildId, newPrefix) => {
  guildPrefixes[guildId] = newPrefix
}

