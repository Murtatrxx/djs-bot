const { MessageEmbed } = require('discord.js')
const error = require('../../utils/error')

module.exports = {
    name: 'npm',
    des: 'search npm',
    options: [
        {
            name: 'query',
            required: true,
            description: 'Name of the package',
            type: 3
        }
    ],
    async run(client, interaction){
        try {
            fetch('https://registry.npmjs.org/'.concat(interaction.data.options.find(m => m.name === 'query').value)).then(res => res.json()).then(m => {
            
            let em = new MessageEmbed()
            .setTitle('404 Not Found')
            .setColor("RED")
            .setDescription("Your query: \""+args[0]+"\" was not found on NPM")
            .setTimestamp()
            
            if (m.error) return interaction.reply("", { embed: em, flags: 64 })
            
            let {
          name,
          author = {},
          repository = {},
          homepage,
          license,
          description = "",
          "dist-tags" : dtags = {},
          _id,
          time
        } = m
        time = Object.values(time)
        
        em.setTitle(name+"@"+dtags.latest)
        .setColor("RED")
          .setDescription(description)
          .setURL("https://npmjs.com/"+_id)
          .setTimestamp()
          if (homepage) em.addFields({ name: 'Home page', value: homepage })
          if (license) em.addFields({ name: 'License', value: license })
          if (time.length) em.addFields({ name: 'Last Publish', value: time[time.length - 1] })
          interaction.reply("", { embed: em })
        })
    } catch (e) {
        error.send("Errors:" + e.stack);
    }
    }
    
}
