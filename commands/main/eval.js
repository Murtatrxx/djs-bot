const {NodeVM} = require('vm2');
const vm = new NodeVM();

module.exports = {
    name: 'eval',
    async execute(client, message, Discord){
        let code = message.content.slice(5)
        process.stdin.on('data', (data) => console.log(data))
        try {
            vm.run(code)
        } catch (e) {
            return message.reply(`\`\`\`js\n${e}\`\`\``)
        }
        message.reply('done')
    }
}

//put this commands in main folder