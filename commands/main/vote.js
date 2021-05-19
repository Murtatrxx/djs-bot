const fetch = require('node-fetch')
const log = require('../../utils/error')

module.exports = {
  name: "vote",
  description: "a vote command",
  help: "Run this command to vote for this bot",
  expArgs: "",
  execute(client, message, args) {
    
    const team = "JavaScript Master"
    fetch(`https://wornoffkeys.com/api/competition/voting?userId=${message.author.id}&teamId=${team}`, { method: 'POST' })
      .then(res => res.json())
      .then(body => {
        
        const msg = await message.reply("Voting, please wait...");
        if (body?.data?.success) {
          msg.edit('Thank you for voting..!\n'+data.message);
          log.send(`There is a vote from ${message.author.tag}(${message.author.id})\nGuild: ${message.guild?.name}(${message.guild?.id})`);
        }
      }).catch(e =>{
        if (e.response.data) {
          const { message: text } = e.response.data;
          msg.edit(text);
          return log.send("Error while voting: "+text);
        }

    })

  }
}