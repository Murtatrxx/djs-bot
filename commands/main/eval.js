const { VM } = require('vm2');
require('../../utils/inline')
let logs = []
const logger = {
    log: (...data) => logs.push(data),
    info: (...data) => logs.push(data),
    error: (...data) => logs.push(data),
    warn: (...data) => logs.push(data)
}
const vm = new VM({
    sandbox: {
        console: logger
    }
});
module.exports = {
    name: 'eval',
    async execute(client, message, Discord){
        process.stdout.on('data', (data) => logg.push(data))
        let code = message.content.slice(5)//.replace(/console\.(log|error|warn)/ig, 'sandbox.stdout.write')
        try {
            vm.run(code)
        } catch (e) {
            return message.ireply(`\`\`\`js\n${e}\`\`\``, {mention: true})
        }finally {
            message.ireply("Console:```js\n"+logs+"```")
            logs = []
        }
    }
}