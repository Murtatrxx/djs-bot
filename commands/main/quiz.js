const fetch = require('node-fetch')

module.exports = {
    name: 'quiz',
    async execute ( ) {
        fetch('https://quizapi.io/api/v1/questions',{ method: 'POST', body: 'apiKey='+process.env.QUIZ_TOKEN })
        .then(res => res.text()).then(console.log)
    }
}