//----------[PACKAGES]----------\\

const Discord = require('discord.js');
const client = new Discord.Client();

//----------[HANDLERS]----------\\

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlerfiles = ['command_handler', 'event_handler']
handlerfiles.forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

//----------[EVENTS]----------\\

client.login(process.env.DISCORD_TOKEN);