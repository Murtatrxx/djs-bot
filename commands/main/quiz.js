const fetch = require('node-fetch')
const key = require('../../config.js').quiz
module.exports = {
    name: 'quiz',
    async execute(client, message, args) {
        let arr = []
        (await fetch(`https://quizapi.io/api/v1/questions?apiKey=${key}&limit=20`).then(res => res.json()))
            .forEach(m => arr.push({ question: m.question, options: [m.answers.map(m => m)], correctIndex: (m.correct_answers.findIndex(e => e === true)) }))
        message.ireply(`${arr[0].question}\n${arr[0].options.map((m, i) => `${i+1}. ${m}`)}`)
    }
}