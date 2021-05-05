const { NodeVM } = require('vm2');
const assert = require('assert');
const { log } = require('util');
const vm = new NodeVM();

module.exports = {
    name: 'eval',
    async execute(client, message, Discord){
        let logg = []
        process.stdout.on('data', (data) => logg.push(data))
        let code = message.content.slice(5).replace(/console\.(log|error|warn)/ig, 'sandbox.stdout.write')
        try {
            console.log(sandbox)
            vm.run(code)
        } catch (e) {
            return message.reply(`\`\`\`js\n${e}\`\`\``)
        }finally {
            message.reply("Not yet implemented"+logg)
        }
    }
}