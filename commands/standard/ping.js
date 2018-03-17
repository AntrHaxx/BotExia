module.exports = {
	name : 'ping',
	description : "Le ping Pong est un sport",
	usage :'`*ping`',
	execute(message, args, client){
		message.channel.send("Pong! "+client.ping+"ms");
	}
};