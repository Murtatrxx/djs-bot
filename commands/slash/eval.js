const { MessageEmbed } = require('discord.js')
const { VM } = require("vm2");
const error = require("../../utils/error")

let logs = [];

const logger = {
  log: (...data) => {
    data.forEach(m => {
      if (m instanceof Object) m = JSON.stringify(m)
    })
    logs.push(data)
  },
  info: (...data) => {
    data.forEach(m => {
      if (m instanceof Object) m = JSON.stringify(m)
    })
    logs.push(data)
  },
  error: (...data) => {
    data.forEach(m => {
      if (m instanceof Object) m = JSON.stringify(m)
    })
    logs.push(data)
  },
  warn: (...data) => {
    data.forEach(m => {
      if (m instanceof Object) m = JSON.stringify(m)
    })
    logs.push(data)
  },
};

const vm = new VM({
  sandbox: {
    console: logger,
  },
});

module.exports = {
    name: 'eval',
    des: 'Evaluates your code',
    options: [
        {
            name: 'code',
            required: true,
            description: 'The code that you want to execute',
            type: 3
        }
    ],
    async run(client, interaction){
      try {
        let mention = false;
        let code = interaction.data.options.find(m => m.name === 'code').value.trim();
        try {
          vm.run(code);
        } catch (e) {
          logs.push(`\n${e.stack.match(/(.*\s*at vm\.js\:\d\:\d)/i)[0]}\n`);
          mention = true;
        } finally {
          let em = new MessageEmbed()
            .setTitle('I\'ve executed your syntax')
            .setColor((mention ? "RED" : 'GREEN'))
            .setAuthor(interaction.member.displayName, interaction.member.user.displayAvatarURL(), interaction.member.user.displayAvatarURL())
            .addFields({ name: 'Source', value: `\`\`\`js\n ${code}\`\`\`` }, { name: 'Result', value: "```js\n" + process.version.substr(0, 5) + "\n" + logs.join('\n') + "```" })
            .setTimestamp()
          interaction.reply("", { embed: em }).catch(e => error.send("Error:" + e.stack));
          logs.splice(0, logs.length);
        }
      } catch (e) {
        error.send("Errors:" + e.stack)
    }
    }

}
