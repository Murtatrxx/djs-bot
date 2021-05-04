const fs = require("fs")

module.exports = (client, Discord) => {
  const loaddirs = (dirs) => {
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    for (const file of command_files) {
      const command = require(`../commands/${dirs}/${file}`)
      if (command.name) {
        client.commands.set(command.name, command);
				console.log('test')
      } else continue
    }
  }
  const commanddirs = ['main', 'example']
  commanddirs.forEach(e => loaddirs(e))

}