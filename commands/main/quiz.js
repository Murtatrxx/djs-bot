const fetch = require('node-fetch');
const key = require('../../config.js').quiz;
const { MessageEmbed } = require('discord.js')
const qts = require('../../utils/quotes.json')


module.exports = {
  name: 'quiz',
  async execute(client, message, args) {
    let arr = [];
    fetch(`https://quizapi.io/api/v1/questions?apiKey=${key}`).then(res => res.json()).then(result => {
      result.forEach(m => arr.push({ question: m.question, options: [m.answers.answer_a, m.answers.answer_b, m.answers.answer_c, m.answers.answer_d, m.answers.answer_e, m.answers.answer_f], correctIndex: (Object.values(m.correct_answers).findIndex(e => e === true)) }));
      
      let embed = new MessageEmbed()
        .setTitle("HTML Quiz")
        .setColor("BLUE")
        .setFooter(`✅ Correct 0/10`)
        .setDescription(`**${arr[0].question}** \n\n${arr[0].options.filter(m => m).map((m, i) => `${i + 1}. ${m}`).join('\n')}`)
      message.channel.send(embed)
    })
  }
}