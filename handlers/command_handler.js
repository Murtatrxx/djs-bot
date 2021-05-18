const fs = require("fs");

module.exports = (client) => {
  const loaddirs = (dirs) => {
    const command_files = fs
      .readdirSync(`./commands/${dirs}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of command_files) {
      const command = require(`../commands/${dirs}/${file}`);
      if (command.name) {
        client.commands.set(command.name, command);
      } else continue;
    }
  };

  ["main" , "programming"].forEach((e) => loaddirs(e));

  () => {
    const command_files = fs
      .readdirSync(`./commands/slash`)
      .filter((file) => file.endsWith(".js"));

    for (const file of command_files) {
      const command = require(`../commands/slash/${file}`);
      if (command.name) {
        client.scmds.set(command.name, command);
      } else continue;
    }
  }

};
