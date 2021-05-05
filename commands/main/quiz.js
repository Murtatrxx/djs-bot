const fetch = require('node-fetch')
const key = process.env.QUIZ_TOKEN
module.exports = {
    name: 'quiz',
    async execute(client, message, args) {
        fetch('https://quizapi.io/api/v1/questions?apiKey='+key,{ method: 'get', /*headers: {  'apiKey' : key }*/ })
        .then(res => res.text()).then(r => message.ireply(JSON.stringify(r)))
    }
}