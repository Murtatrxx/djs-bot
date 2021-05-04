const {NodeVM} = require('vm2');
const vm = new NodeVM();

module.exports = {
    name: 'eval',
    async execute(client, message, Discord){
        let code = message.content.slice(5)
        let logs = []
        process.stdin.on('data', (data) => logs.push(data))
        try {
            vm.run(code)
        } catch (e) {
            return message.reply(`\`\`\`js\n${e}\`\`\``)
        }
        message.reply("Logs:"+logs)
    }
}

//put this commands in main folder