module.exports = {
	name : 'ping',
	permissions: {
		"*": "*"
	},
	execute(message = null, args = null, client = null){
		if (message == null || message.author == undefined)
			Log.info("Pong! "+client.ping+"ms");
		else
			Msg.info("Pong! "+client.ping+"ms");
	}
};