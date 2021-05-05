const { VM } = require('vm2');
const assert = require('assert');
const { log } = require('util');
const vm = new NodeVM();
const log = (...data) => logs.push(...data)

module.exports = {
    name: 'eval',
    async execute(client, message, Discord){
        let code = message.content.slice(5)
        let logs = []
        try {
            assert.ok(vm.run(`console.log`) === log());
            vm.run(code)
        } catch (e) {
            return message.reply(`\`\`\`js\n${e}\`\`\``)
        }finally {
            message.reply("Not yet implemented"+log)
        }
    }
}