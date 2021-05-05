const { VM } = require('vm2');
const assert = require('assert');
const { log } = require('util');
const vm = new VM();
let logs = ['test']

const logg = (...data) => {
    logs.push(...data)
    return true;
}

module.exports = {
    name: 'eval',
    async execute(client, message, Discord){
        let code = message.content.slice(5)
        try {
            assert.ok(vm.run(`console.log`) === logg);
            vm.run(code)
        } catch (e) {
            return message.reply(`\`\`\`js\n${e}\`\`\``)
        }finally {
            message.reply("Not yet implemented"+logs)
        }
    }
}