const fetch = require('node-fetch')
const key = process.env.QUIZ_TOKEN;
module.exports = {
    name: 'quiz',
    async execute(client, message, args) {
        console.log(key)
        fetch(`https://quizapi.io/api/v1/questions?apiKey=${key}&limit=20`)
        .then(res => res.text()).then(r => message.ireply(JSON.stringify(r)))
    }
}