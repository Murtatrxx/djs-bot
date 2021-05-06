// @ts-check
const { MessageEmbed } = require('discord.js')
const { VM } = require("vm2");
require("../../utils/inline");
let logs = [];
const logger = {
  log: (...data) => logs.push(data),
  info: (...data) => logs.push(data),
  error: (...data) => logs.push(data),
  warn: (...data) => logs.push(data),
};
const vm = new VM({
  sandbox: {
    console: logger,
  },
});
let mention = false;
module.exports = {
  name: "eval",
  async execute(client, message, Discord) {
    let code = message.content.slice(5).trim();
    try {
      vm.run(code);
    } catch (e) {
      e = new EvalError(e.message)
      logs.push(`\n${e.message + " vm.js:" + (e.lineNumber ?? '1')+":"+ (e.columnNumber ?? '1')}\n`);
      mention = true;
    } finally {
      let em = new MessageEmbed()
        .setTitle('I\'ve executed your syntax')
        .setColor('GREEN')
        .setTimestamp()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL(), message.author.displayAvatarURL())
        .addFields({name: 'Source', value: `\`\`\`js\n ${code}\`\`\``}, {name:'Result', value:"```js\n"+ process.version.substr(0, 5) +"\n"+ logs.join('\n') + "```"})
      message.ireply("", { embed:em, mention: mention });
      logs.splice(0, logs.length);
    }
  },
};
