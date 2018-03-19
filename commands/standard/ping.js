module.exports = {
	name : 'ping',
	permissions: {
		"*": "*"
	},
	execute(message, args, client){
		Msg.info("Pong! "+client.ping+"ms");
	}
};