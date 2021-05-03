//----------[PACKAGES]---------\\

const mongo = require("mongoose");
const fetch = require("node-fetch");
const Discord = require("discord.js");

//----------[VARIBLES]---------\\

const mongof = require("./mongo");
const levels = require("./commands/levels");
const log = require("./automoderator/modlog");
const ul = require("./automoderator/swearwrds");
const commandbase = require("./commands/command-base.js");
const loadCommands = require("./commands/load-commands");
const antispam = require("./automoderator/antispam");
const link = require('./automoderator/antilink.js');
const { muted } = require("./commands/command-base");

const prefix = "?";
const usedCommand = new Set();
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const color = "BLACK";
const tickemoji = `<:upvote:813326237183246337>`;
const crossemoji = `<:downote:813328516061200415>`;
const ownerID = "756393473430519849";

let channel = "800985067891326976";

//----------[SCHEMAS]---------\\

const Guild = require("./schemas/count-channels");
const user = require("./schemas/users-schema");
const prefixschema = require("./schemas/prefix-schema");

//----------[EVENTS]---------\\

bot.commands = new Discord.Collection();
require("dotenv").config();

bot.once("ready", async () => {
  bot.user.setActivity(`discord`, { type: "COMPETING" });
  console.log("This bot is online.");

//---------[SLASH COMMANDS]----------\\
  
  const commands = await bot.api
  .applications(bot.user.id)
  .commands.get()

  //console.log(commands)
  //await bot.api.applications(bot.user.id).commands().delete()
  
    loadCommands(bot);
    antispam(bot);
    levels(bot);
    log(bot);
    link(bot);
// commandbase.loadPrefixes(bot)
});

bot.on("message", async message => {
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  //[-------------------[CMNDS]-------------------]
  
  ul(message);
  
   //[-------------------[COUNTS]-------------------]
   
  if(message.content.startsWith(prefix + "setCountChannel ") || message.content.toString() == prefix + "setCountChannel") {
    const channel = message.mentions.channels.first() || message.channel;
 
         Guild.findOne({
          id: message.guild.id,
        }, async(err, data) => {
          if(err) throw err;
          if(data) {
            data.Channel = channel.id;
            data.Current = 0
          } else {
            data = new Guild({
              id: message.guild.id,
              Current: 0,
              Channel: channel.id
            })
          }
          data.save();
          message.delete();
          let g = await message.channel.send('Counting channel has been binded to ' + `<#${channel.id}>` + ", continue typing starting at 2");
          g.delete({ timeout: 5 * 1000})
        });
}

  if(message.channel.type === "news") {
    if (message.author.id == "793024254840668230") return;
    message.crosspost();
    let m = await message.channel.send("I published your message");
    m.delete({ timeout: 5 * 1000 })
  }
  
  //[-------------------Mention Commands-------------------]

   if(message.content.includes("@")) {
      const args = message.content.split(/ +/);
      if(message.content.startsWith(prefix)) return;
      let target = message.mentions.users.first();
      let g = message.content.replace(`<@!${bot.user.id}>`, "");
      if(!g == "" || !g == null) return
      if(args[1]) {
        return 
      }
        if(!target) return;
      if (target.id == "793024254840668230") {
        let cprefix = "`";
        const embed = new Discord.MessageEmbed().setColor(color).setDescription(`My prefix here is ${cprefix}${prefix}${cprefix}, you can type **${prefix}help** for more information`)
        message.channel.send(embed);
      }
    }
  
  //[------------------- COUNTING PART -------------------]
  
  //[-------------------Leaderboard-------------------]
  
  if(message.content.toString() == prefix + "leaderboard") {
    
    let Var = true;
    
    Guild.findOne({
      id: message.guild.id
    }, async(err, data) => {
        if(!data) {
          Var == false;
        }
    });
    
    if(Var == false) return message.channel.send("This guild does not have any counting channel");
    
         user.find({ Guild: message.guild.id }, async(err, data) => {
            const sort = data.sort((a, b) => b.Counts - a.Counts);

            let i = 1;

            if (data.length > 10) {
              const chunks = twochunk(sort, 10);
              const arry = [];

              for (const chunk of chunks) {
                const chunking = chunk
                  .map(v => `\`#${i++}\` **<@${v.id}>** (${v.Counts} counts)`)
                  .join("\n\n");
                arry.push(
                  new Discord.MessageEmbed()
                    .setTitle("Here is leaderboard")
                    .setColor("YELLOW")
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setDescription(chunking)
                );
              }
            } else {
              const mapping = sort
                .map(v => `\`#${i++}\` **<@${v.id}>** (${v.Counts} counts)`)
                .join("\n\n");
              message.channel.send(
                new Discord.MessageEmbed()
                  .setTitle("Here is leaderboard")
                  .setThumbnail(message.guild.iconURL({ dynamic: true }))
                  .setColor("YELLOW")
                  .setDescription(mapping)
              );
            }
        })
    }
  
  //[-------------------Counts-------------------]
  
    const data = await Guild.findOne({ id: message.guild.id });

    if(!data) return;

    if(message.channel.id !== data.Channel) return;
  
    if(parseInt(message.content) === data.Current + 1) {
        user.findOne({ id: message.author.id, Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                data.Counts = data.Counts + 1;
            } else {
                data = new user({
                    id: message.author.id,
                    Guild: message.guild.id,
                    Counts: 1
                })
            }
            data.save();
        })
    
        data.Current = parseInt(message.content);
        data.save();
    } else message.delete();
});

bot.on("guildMemberAdd", member => {
  let embed = new Discord.MessageEmbed().setTitle("Hello").setDescription(`Have great time in **${member.guild}**. Make sure to read  and verify in `).setImage("https://cdn.glitch.com/df5bf303-16ac-41ae-a019-64dd7a6dc471%2F3438f6ff-cda7-476e-8f65-701bf3297580.image.png?v=1614688548773").setAuthor(member.user.username, member.user.displayAvatarURL());
  let msg = "👿 | If you did it to get rid of your mute from this server you failed"
  let maaa = muted ? msg : embed
  member.send(maaa);

  const role = member.guild.roles.cache.find(c => c.name === "Muted");

  if(muted == true) {
    member.roles.add(role.id)
     setTimeout(function() {
      member.roles.remove(role.id);
      muted = false;
    }, 10000 * 3);
  }
});

bot.on("guildCreate" , async(guild) => {
    let embed = new Discord.MessageEmbed().setColor("BLACK").setTitle("I have been successfully added to the server and my prefix is `>` or <@793024254840668230> admins can change prefix on our website").setDescription("But there are steps we need to complete before starting my mission \n \n **NOTE:** These changes are saved to the bot and can only be changed on the bot's website after it finishes ( https://visualbot.xyz )").setThumbnail(bot.displayAvatarURL()).addField("Steps \n" , ":mute: Set the mute role \n 🔱 Set the moderator role \n 🔧 Set the mod-log channel \n 👋 Set the welcome role \n ⚙ Other Settings \n 👁 View the settings").setFooter("This ends in 3 minutes ・ Type start to start")
    let channelToSend;
 
  for(const channel of guild.channels) {
        if(channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel;
        if(!channelToSend) return;
  };
    channelToSend.send(embed);
  });

function twochunk(arr, size) {
    var array = [];
    for(var i = 0; i < arr.length; i += size) {
        array.push(arr.slice(i, i+size));
    }
    return array;
}

const mongoPath = process.env.MONGO_SRV;

mongo.connect(mongoPath , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log("Connected the database (db01) using mongoose 5.12.3");
}).catch((e) => {
  throw e;
});

setInterval(async () => {
  await fetch("https://visualbot-dc.glitch.me").then(console.log("Ping!"));
}, 1000);

bot.login(process.env.TOKEN);
