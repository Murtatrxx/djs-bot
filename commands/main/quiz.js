// @ts-check
const fetch = require("node-fetch");
const key = require("../../config.js").quiz;
const { MessageEmbed, Collection } = require("discord.js");
const status = new Collection();

const reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

module.exports = {
  name: "quiz",
  async execute(client, message, args) {
    let embed = new MessageEmbed()
      .setTitle("💻Programming quiz💻")
      .setColor("BLUE")
      .setDescription(
        `**Are you ready to start the quiz?** React to ✅ to continue`
      ).addFields({
        name: 'Instructions',
        value: '● Read the questions.\n● There are 2 - 5 options for a question.\n● React to the message according to the Options\n● React with ❌ anytime to quit.'
      });
    let arr = [];
    let score = 0,
      qn = 0;
    let sts = status.get(message.author.id);
    // @ts-ignore
    fetch(
      `https://quizapi.io/api/v1/questions?category=code&limit=10&apiKey=${key}`
    )
      .then((res) => res.json())
      .then(async (result) => {
        result.forEach((m) => {
          arr.push({
            question: m.question,
            options: Object.values(m.answers),
            correctIndex: Object.values(m.correct_answers).findIndex(
              (e) => e === "true"
            ),
          });
        });

        // bool is for checking whether it's done by user or not.
        const skip = (msg, bool) => {
          if (bool) score++
          msg.reactions.removeAll();
          if (qn > 9) return collector.stop();
          qn++;
          embed.fields.splice(0, embed.fields.length);
          embed
            .setFooter(`Question ${qn + 1}/10 ● Score: ${score}`)
            .setColor("BLUE")
            .setDescription(`__${arr[qn].question}__`)
            .addFields({
              name: "Options",
              value: arr[qn].options
                .filter((m) => m)
                .map((m, i) => `${i + 1}. ${m}`)
                .join("\n"),
            });
          msg.edit("", { embed: embed });
          arr[qn].options
            .filter((m) => m)
            .forEach((m, index) => {
              msg.react(reactions[index]);
            });
        };

        let msg = await message.channel.send(embed);
        msg.react("✅");
        msg.react("❌");
        const filter = (r, u) =>
          u.id === message.author.id &&
          !u.bot &&
          ["✅", "❌"].includes(r.emoji.name);
        let cltr = await msg
          .awaitReactions(filter, { time: 60000, max: 1, errors: ["time"] })
          .catch((e) =>{
            msg.edit("", {
              embed: embed.setDescription("**Quiz cancelled**").setColor("RED"),
            });
            msg.reactions.removeAll()
          }
          );
        if (cltr.first().emoji.name === "❌") {
          msg.reactions.removeAll()
          return msg.edit("", {
            embed: embed.setDescription("**Quiz cancelled**").setColor("RED"),
          });
        } else msg.reactions.removeAll()

        embed
          .setFooter(`Question ${qn + 1}/10 ● Score: ${score}`)
          .setColor("BLUE")
          .setDescription(`__${arr[0].question}__`)
          .addFields({
            name: "Options",
            value: arr[0].options.filter((m) => m).map((m, i) => `${i + 1}. ${m}`).join("\n"),
          }).fields.splice(0, embed.fields.length);

        arr[qn].options.filter((m) => m).forEach((m, index) => msg.react(reactions[index]));

        msg.edit("", { embed: embed });
        const collector = msg.createReactionCollector((r, u) => u.id === message.author.id && !u.bot && (reactions.includes(r.emoji.name) || u));

        collector.on("collect", (reaction, user) => {
          console.log(qn, score);
          skip(msg, (arr[qn].correctIndex === reactions.findIndex((q) => q === reaction.emoji.name)));
        });
      });
  },
};
