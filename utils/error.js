const { WebhookClient } = require("discord.js")

module.exports = new WebhookClient(process.env.ERROR_ID, process.env.ERROR_TOKEN)