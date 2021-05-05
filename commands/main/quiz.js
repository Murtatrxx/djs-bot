// @ts-check
const fetch = require('node-fetch');
const key = require('../../config.js').quiz;
const { MessageEmbed, Collection } = require('discord.js')
const qts = require('../../utils/quotes.json')
const status = new Collection()

const reaction = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']


module.exports = {
  name: 'quiz',
  async execute(client, message, args) {
    let embed = new MessageEmbed()
      .setTitle("Random programming quiz")
      .setColor("BLUE")
      .setDescription(`**Are you ready to start the quiz?** React to ✅ to continue`)
    let arr = []
    status.set(message.author.id, { score: 0, qn: 0 })
    let sts = status.get(message.author.id)
    // @ts-ignore
    fetch(`https://quizapi.io/api/v1/questions?category=code&limit=10&apiKey=${key}`).then(res => res.json()).then(async result => {
      result.forEach(m => arr.push({ question: m.question, options: Object.values(m.answers), correctIndex: (Object.values(m.correct_answers).findIndex(e => e === true)) }));
      
      // bool is for checking whether it's done by user or not.
      const skip = (msg) => {
        msg.reactions.removeAll()
				if (sts.qn > 9) return;
				sts.qn++
        embed
        .setFooter(`✅ Correct ${sts.score}/10`)
        .setColor('BLUE')
        .setDescription(`**${arr[sts.qn].question}** \n\n${arr[sts.qn].options.filter(m => m).map((m, i) => `${i + 1}. ${m}`).join('\n')}`)
        msg.edit("",{ embed: embed})
        arr[sts.qn].options.filter(m => m).forEach((m, index) => {
          msg.react(reaction[index])
        });
      }

      let msg = await message.channel.send(embed)
      msg.react('✅')
      msg.react('❌')
      const filter = (r, u) => u.id === message.author.id && !u.bot && ['✅', '❌'].includes(r.emoji.name)
      let cltr = await msg.awaitReactions(filter, { time: 60000, max: 1, errors: ['time'] }).catch(e => msg.edit("", { embed: embed.setDescription('**Quiz cancelled**').setColor('RED')}))
			if (cltr.first().emoji.name === '❌') {
        msg.reactions.removeAll()
        return msg.edit("", { embed: embed.setDescription('**Quiz cancelled**').setColor('RED')})
      }
      else msg.reactions.removeAll()


      embed
        .setFooter(`✅ Correct ${sts.score}/10`)
        .setColor('BLUE')
        .setDescription(`**${arr[0].question}** \n\n${arr[0].options.filter(m => m).map((m, i) => `${i + 1}. ${m}`).join('\n')}`)

      msg.edit("", {embed: embed})
      const collector = msg.createReactionCollector((r, u) => u.id === message.author.id && !u.bot)

      collector.on('collect', (reaction, user) => {
        reaction.users.remove(user.id)
        console.log(sts.qn, sts.score)
        switch (reaction.emoji.name) {
          case '1️⃣':
            skip(msg)
            if (arr[sts.qn].correctIndex == 0) {
              sts.score++
            }
            break;
          case '2️⃣':
            skip(msg)
            if (arr[sts.qn].correctIndex == 1) {
              sts.score++
            }
            break;
          case '3️⃣':
            skip(msg)
            if (arr[sts.qn].correctIndex == 2) {
              sts.score++
            }
            break;
          case '4️⃣':
            skip(msg)
            if (arr[sts.qn].correctIndex == 3) {
              sts.score++
            }
            break;
          case '5️⃣':
            skip(msg)
            if (arr[sts.qn].correctIndex == 4) {
              sts.score++
            }
            break;
        }
      })

    })
  }
}