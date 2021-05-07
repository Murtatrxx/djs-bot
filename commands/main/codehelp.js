const error = require("../../utils/error")

module.exports = {
  name: "codehelp",
  async execute(client, message, Discord) {
    message.channel.send("ok").catch(e => error.send("Error:"+e.stack));
  },
}