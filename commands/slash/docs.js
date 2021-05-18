const error = require('../../utils/error')
const fetch = require('node-fetch')

module.exports = {
    name: 'ping',
    des: 'Pong..!',
    options: [
        {
            name: 'query',
            required: true,
            type: 3,
            description: 'Query to djs docs'
        },
        {
            name: 'source',
            required: false,
            type: 3,
            description: 'Query source',
            choices: [
                {
                    name: 'collection',
                    value: 'collection'
                },
                {
                    name: 'stable',
                    value: 'stable'
                },
                {
                    name: 'master',
                    value: 'master'
                }
            ]
        }
    ],
    async run(client, interaction){
        try {
            let source = interaction.data.options?.find(m => m.name === 'source')?.value ?? "stable"
            fetch(`https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${interaction.data.options.find(m => m.name === 'query').value}`)
                .then(res => res.json()).catch(e => error.send("Errors: " + e))
                .then(m => {
                    interaction.reply("", { embed: m })
                }).catch(e => error.send("Errors: " + e))
        } catch (e) {
            error.send("Errors:" + e.stack)
        }
    }

}