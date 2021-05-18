const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'mdn',
    des: 'search mdn docs',
    options: [
        {
            name: 'query',
            required: true,
            type: 4
        }
    ],
    async run(client, interaction){

    }

}