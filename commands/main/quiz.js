const fetch = require('node-fetch')
const key = process.env.QUIZ_TOKEN
module.exports = {
    name: 'quiz',
    async execute(client, message, args) {
        fetch('https://quizapi.io/api/v1/questions',{ method: 'get', headers: {  'X-Api-Key' : key } })
        .then(res => res.text()).then(r => message.ireply(JSON.stringify(r)))
    }
}