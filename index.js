//----------[PACKAGES]----------\\

const express = require('express')
const Discord = require('discord.js');
const client = new Discord.Client();

//----------[CONSTANTS]----------\\

const app = express();

app.post('/restart/' + process.env.RESTART, (req, res) => {
    res.sendStatus(200);
    process.exit(2);
});

app.get('/', (req, res) => {
	res.send('Server is up..!');
});

app.listen(4000, () => {
    console.log("Server has Started");
});

//----------[HANDLERS]----------\\

process.stdin.on('data', (data) => console.log(data))
process.stdout.on('data', (data) => console.log(data))

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlerfiles = ['command_handler', 'event_handler']
handlerfiles.forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})

//----------[EVENTS]----------\\

client.login(process.env.DISCORD_TOKEN);