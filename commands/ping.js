module.exports = {
	name: 'ping',
    execute(client, message, Discord) {
        //message.channel.send('pong!');
        message.channel.send('Pinging...').then(sent => {
            sent.edit(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`);
            console.log(`Pong! Took ${sent.createdTimestamp - message.createdTimestamp}ms`)
        });
    }
}