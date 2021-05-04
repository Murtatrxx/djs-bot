const {NodeVM} = require('vm2');
const assert = require('assert');
const { log } = require('util');
const vm = new NodeVM();

let logs = [], warns = [], errors = [];

const logger = {
    log: (...data) => logs.push(...data),
    warn: (...data) => warns.push(...data),
    error: (...data) => errors.push(...data)
}

module.exports = {
    name: 'eval',
    async execute(client, message, Discord){
        let code = message.content.slice(5)
        let logs = []
        process.stdout.on('data', (data) => console.log('data'))
        try {
            // assert.ok(vm.run(`console.log`) === logger.log);
            // assert.ok(vm.run(`console.error`) === logger.error);
            // assert.ok(vm.run(`console.warn`) === logger.warn);
            vm.run(code)
        } catch (e) {
            return message.reply(`\`\`\`js\n${e}\`\`\``)
        }
        message.reply("Logs:"+logs+warns+errors)
    }
}

//put this commands in main folder