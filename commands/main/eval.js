const {NodeVM} = require('vm2');
const assert = require('assert');
const { log } = require('util');
const vm = new NodeVM();


module.exports = {
    name: 'eval',
    async execute(client, message, Discord){
        let code = message.content.slice(5)
        let logs = []
        try {
            // assert.ok(vm.run(`console.log`) === logger.log);
            // assert.ok(vm.run(`console.error`) === logger.error);
            // assert.ok(vm.run(`console.warn`) === logger.warn);
            vm.run(code)
        } catch (e) {
            return message.reply(`\`\`\`js\n${e}\`\`\``)
        }
        message.reply("Not yet implemented")
    }
}

//put this commands in main folder