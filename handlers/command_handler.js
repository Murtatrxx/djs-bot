const fs = require("fs");

module.exports = (client, Discord) => {
  const loaddirs = (dirs) => {
    const command_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));
    
    for (const file of command_files) {
      console.log(file)
      const command = require(`../commands/${dirs}/${file}`)
      if (command.name) {
        client.commands.set(command.name, command);
        console.log('test')
      } else continue
    }
  }

  ['main'].forEach(e => loaddirs(e));

}