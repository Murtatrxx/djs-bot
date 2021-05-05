const { NodeVM } = require('vm2');
const assert = require('assert');
const { log } = require('util');
const vm = new NodeVM();

module.exports = {
    name: 'eval',
    async execute(client, message, Discord){
        let code = message.content.slice(5)
        try {
            vm.run("console.log = (...data) => process.stdout.write(data)\n"+code)
        } catch (e) {
            return message.reply(`\`\`\`js\n${e}\`\`\``)
        }finally {
            message.reply("Not yet implemented"+logs)
        }
    }
}