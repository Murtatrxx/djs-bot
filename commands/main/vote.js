const axios = require('axios')
const log = require('../../utils/error')
require('../../utils/inline')

module.exports = {
  name: "vote",
  description: "a vote command",
  help: "Run this command to vote for this bot",
  expArgs: "",
  async execute(client, message, args) {
    
    const team = "JavaScript Master"
    const msg = await message.ireply("Voting, please wait...", { mention: true });
    axios.post(`https://wornoffkeys.com/api/competition/voting?userId=${message.author.id}&teamId=${team}`)
      .then(body => {
        if (body?.data?.success) {
          msg.edit(body.data.message);
          log.send(`There is a vote from ${message.author.tag} (${message.author.id})\nGuild: ${message.guild?.name} (${message.guild?.id})`);
        }
      }).catch(e =>{
        if (e?.response?.data) {
          const { message: text } = e.response.data;
          msg.edit(text);
        }
        return log.send("Error while voting: "+e);

    })

  }
}