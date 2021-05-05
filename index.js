//----------[PACKAGES]----------\\

const express = require('express')
const Discord = require('discord.js');
const client = new Discord.Client();
const app = express();

//----------[CONSTANTS]----------\\

app.use(express.static('./site/public'))

app.post('/restart/' + process.env.RESTART, (req, res) => {
    res.sendStatus(200);
    process.exit(2);
});

app.listen(4000, () => {
    console.log("Server has Started");
});

//----------[HANDLERS]----------\\

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlerfiles = ['command_handler', 'event_handler']
handlerfiles.forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})

//----------[EVENTS]----------\\

client.on('ready' , async() => {
  client.user.setStatus("WOK" , { type: "COMPETITING" });
});

client.login(process.env.DISCORD_TOKEN);