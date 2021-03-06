// @ts-check
const { MessageEmbed } = require('discord.js')
const { VM } = require("vm2");
const error = require("../../utils/error")
require("../../utils/inline");
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
  name: "eval",
  description: "Run your own commands",
  help: "Evaluate code you have filled in as Argument",
  expArgs: "<code you want to evaluate>",
  async execute(client, message, Discord) {
    try {
      let mention = false;
      let code = message.content.slice(5).trim();
      try {
        vm.run(code);
      } catch (e) {
        logs.push(`${e.stack.match(/(.*\s*at vm\.js\:\d\:\d)/i)?.[0] ?? e}`);
        mention = true;
      } finally {
        let em = new MessageEmbed()
          .setTitle('I\'ve executed your syntax')
          .setColor((mention ? "RED" : 'GREEN'))
          .setTimestamp()
          .setAuthor(message.member.displayName, message.author.displayAvatarURL(), message.author.displayAvatarURL())
          .addFields({ name: 'Source', value: `\`\`\`js\n ${code}\`\`\`` }, { name: 'Result', value: "```js\n" + process.version.substr(0, 5) + "\n" + logs.join('\n') + "```" })
        message.ireply("", { embed: em, mention: mention }).catch(e => error.send("Error:" + e.stack));
        logs.splice(0, logs.length);
      }
    } catch (e) {
      error.send("Errors:" + e.stack)
    }
  },
};
