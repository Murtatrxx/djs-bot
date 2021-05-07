// @ts-check
const fetch = require("node-fetch");
const key = require("../../config.js").quiz;
const { MessageEmbed } = require("discord.js");
const qoute = require("../../utils/quotes.json");

const reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];


module.exports = {
  name: "quiz",
  async execute(client, message, args) {
    //embed
    let embed = new MessageEmbed()
      .setTitle("Programming quiz")
      .setColor("BLUE")
      .setDescription(`**Are you ready to start the quiz?** React to ✅ to continue`)
      .addFields({
        name: 'Instructions',
        value: '● Read the questions.\n● There are 2 - 5 options for a question.\n● React to the message according to the Options\n● React with ❌ anytime to quit.'
      })
      .setFooter('You have 60s to react.')
      .setTimestamp();

    //Meta
    let arr = [], score = 0, qn = 0;

    // For showing the answer
    const showans = async (msg, arr, extras = {}) => {
      let { exp, tip, diff, cat } = arr.meta, {rxn, user } = extras, color, des;
      msg.reactions.removeAll()
      msg.react('⏭️').catch(e => msg.react('⏭️').catch(console.error))
      msg.react('❌')
      if(arr.correctIndex.includes(reactions.findIndex(f => f === rxn.emoji.name))) {
        score++
        color = "GREEN"
      }else {
        color = "RED"
      }
      embed.fields[0].value = arr.options.filter((m) => m).map((m, i) => `${( arr.correctIndex.includes(i) ? ":white_check_mark: " : ":x:")} ${i+1}. ${m}`).join("\n");
      if (arr.meta.exp) embed.addFields({ name: 'Explanation', value: arr.meta.exp})
      embed.setFooter(`Question ${qn + 1}/10 • Score: ${score}`).setColor(color)
      msg.edit("", { embed: embed})
      let cltr = await msg.awaitReactions((r, u) => !u.bot && r.emoji.name === '⏭️' && u.id === message.author.id,  { max: 1 })
      return msg;
    };

  // @ts-ignore
    fetch(`https://quizapi.io/api/v1/questions?category=code&limit=10&apiKey=${key}`)
      .then((res) => res.json())
      .then(async (result) => {
        result.forEach((m) => {
          let mmm = []
          Object.values(m.correct_answers).forEach((mm, ii) => {
            if ( mm === 'true' ) mmm.push(ii)
          })
          arr.push({
            question: m.question,
            options: Object.values(m.answers),
            correctIndex: mmm,
            meta: { exp: m.explanation, tip: m.tip, diff: m.difficulty, cat: m.category }
          });
        });

        //Quit function 
        const quit = (msg, { cltr }) => {
          cltr.stop()
          msg.reactions.removeAll()
          embed.fields.splice(0, embed.fields.length)
          embed.setColor("GREEN")
            .setAuthor(message.member.displayName, message.author.displayAvatarURL())
            .setFooter()
            .setTimestamp()
            .setTitle("Great attempt")
            .setDescription()
          msg.edit("", { embed: embed })
        };

        //For skiping the question
        const skip = (msg, { collector }) => {
          msg.reactions.removeAll();
          if (qn > 9) return quit(msg, { cltr: collector });
          qn++;
          embed.fields.splice(0, embed.fields.length);
          embed
            .setTitle("Programming quiz")
            .setFooter(`Question ${qn + 1}/10 • Score: ${score}`)
            .setColor("BLUE")
            .setDescription(`${arr[qn].question}`)
            .addFields({
              name: "Options",
              value: arr[qn].options.filter((m) => m).map((m, i) => `${i + 1}. ${m}`).join("\n"),
            });
          msg.edit("", { embed: embed });
          msg.react('❌')
          arr[qn].options.filter((m) => m).forEach((m, index) => {
              msg.react(reactions[index]);
            });
        };

        // First message
        let msg = await message.ireply("", { embed: embed });
        msg.react("✅");
        msg.react("❌");

        const filter = (r, u) => u.id === message.author.id && !u.bot && ["✅", "❌"].includes(r.emoji.name);
        let cltr = await msg.awaitReactions(filter, { time: 60000, max: 1, errors: ["time"] }).catch((e) =>{
          msg.reactions.removeAll()
          msg.edit("", {
            embed: embed.setDescription("**Quiz cancelled**").setColor("RED"),
          });
        });

        if (cltr.first().emoji.name === "❌") {
          msg.reactions.removeAll()
          return msg.edit("", {
            embed: embed.setDescription("**Quiz cancelled**").setColor("RED"),
          });
        } else msg.reactions.removeAll()

        // For removing the instructions field
        embed.fields.splice(0, embed.fields.length)
        skip(msg)

        msg.edit("", { embed: embed });
        const collector = msg.createReactionCollector((r, u) => u.id === message.author.id && !u.bot && (reactions.includes(r.emoji.name) || r.emoji.name === '❌'));

        collector.on("collect", (reaction, user) => showans(msg, arr[qn], { rxn: reaction, user }).then(m => skip(m, { collector })));
      });
  },
};
