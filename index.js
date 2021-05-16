//----------[PACKAGES]----------\\
const error = require("./utils/error");
const express = require("express");
const Discord = require("discord.js");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]} );
const app = express();

//----------[CONSTANTS]----------\\

app.use(express.static("./site/public"));

app.post("/restart/" + process.env.RESTART, (req, res) => {
  res.sendStatus(200);
  process.exit(2);
});

app.listen(4000, () => {
  console.log("Server has Started");
});

//errors
process.on("unhandledRejection", (e) => error.send("UnhandledRejection: "+e.stack ?? e))
process.on("uncaughtException", (e, o) => error.send("UnhandledRejection: "+(e.stack ?? e )+"\n"+o))

//----------[HANDLERS]----------\\

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const handlerfiles = ["command_handler", "event_handler"];
handlerfiles.forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.once("ready" , async() => {
  client.user.setActivity(`WOK`, { type: "COMPETING" });
});

client.login(process.env.DISCORD_TOKEN)
