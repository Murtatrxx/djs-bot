const fetch = require('node-fetch')
const key = require('../../config.js').quiz
module.exports = {
    name: 'quiz',
    async execute(client, message, args) {
        console.log(key)
        fetch(`https://quizapi.io/api/v1/questions?apiKey=${key}&limit=20`)
        .then(res => res.text()).then(r => message.ireply(JSON.stringify(r)))
    }
}