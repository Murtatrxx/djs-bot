const prefix = '$';
const util = require("../../Utils/CMDmismatch")

const valperms = (permissions) => {
    const PermsValid = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!PermsValid.includes(permission)) {
            console.error(`${permission} doesnt exist.`)
        }
    }
}

module.exports = (client, message, commandvalidator) => {
    let { minArgs = 0 } = commandvalidator.minArgs
    let { maxArgs = null, } = commandvalidator.maxArgs
    let { perms = [], } = commandvalidator.perms

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const { member, content } = message
    const args = content.toLowerCase().slice(prefix.length).split(/[ ]+/);

    const cmd = args.shift();
    const command = client.commands.get(cmd);

    args.shift()

    if (args.length < minArgs || (args.content !== null && args.length > maxArgs)) return message.channel.send(util.argumentMismatch)



    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
        valperms(permissions)
        for (const permission of permissions) {
            if (!message.author.hasPermission(permission)) return message.channel.send("You dont have the permission to do that")
        }
    }

    if (command) command.execute(client, message, args);

}
