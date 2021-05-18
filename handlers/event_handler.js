const fs = require("fs");

module.exports = (client, handler) => {
  const loaddirs = (dirs) => {
    const event_files = fs
      .readdirSync(`./events/${dirs}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of event_files) {
      const event = require(`../events/${dirs}/${file}`);
      const event_name = file.split(".")[0];
      client.on(event_name, (...params) => event(client, ...params));
    }
  };

  const eventdirs = ["client", "guild"];
  eventdirs.forEach((e) => loaddirs(e));

  handler.on('interaction', async interaction => {
    client.scmds.get(interaction.data.name)
  })
};
