const fetch = require('node-fetch')

module.exports = {
    name: 'quiz',
    async execute (client, message, args) {
        fetch('https://quizapi.io/api/v1/questions',{ method: 'get', headers: {  'X-Api-Key' : process.env.QUIZ_TOKEN } })
        .then(res => res.text()).then(r => message.semd(JSON.stringify(r), { split: {char:''}}))
    }
}