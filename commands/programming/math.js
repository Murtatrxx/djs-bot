const math = require('mathjs')
const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "math",
  description: "Runs the math command",
  help: "Math!",
  expArgs: "<experission>",
  async execute(client, message, args) {
    let resp;
    let text = args.join(" ")
    if(!args[1]) return message.channel.send("Please enter a experission")
    
    
    try {
      resp = math.evaluate(text)
    } catch(e) {
      let a = "```"
      return message.channel.send(`I think you entered the math incorrectly :c ${a}${e}${a}`)
    }
    
    let g = await message.channel.send("Calculating ...")
    g.delete()
    
    
    const embed = new MessageEmbed()
    .setColor("BLACK")
    .setTitle('Calculator')
    .addField('Question', `\`\`\`css\n${text}\`\`\``)
    .addField('Answer', `\`\`\`css\n${resp}\`\`\``)
    .setFooter(`⌚ Speed: ${g.createdTimestamp - message.createdTimestamp}ms`)
    
    message.channel.send(embed);
  }
}
