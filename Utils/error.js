const { WebhookClient } = require("discord.js")

module.exports = WebhookClient(process.env.ERROR_ID, process.env.ERROR_TOKEN)