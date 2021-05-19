const math = require('mathjs')

module.exports = {
  name: "math",
  description: "Runs the math command",
  help: "Math!",
  expArgs: "<experission>",
  async execute(client, message, Discord) {
    
    if (message.guild.id === '839102795327864852') return;
    let resp;
    try {
      resp = math.evaluate(message.content)
    } catch(e) {
      let a = "```"
      return message.channel.send(`I think you entered the math incorrectly :c ${a}${e}${a}`)
    }
    
    let g = await message.channel.send("Calculating ...")
    g.delete()
    
    
    const embed = new MessageEmbed()
    .setColor(color)
    .setTitle('Calculator')
    .addField('Question', `\`\`\`css\n${text}\`\`\``)
    .addField('Answer', `\`\`\`css\n${resp}\`\`\``)
    .setFooter(`⌚ Speed: ${g.createdTimestamp - message.createdTimestamp}ms`)
    
    message.channel.send(embed);
  }
}