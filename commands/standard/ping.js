module.exports = {
	name : 'ping',
	execute(message, args, client){
		Msg.info("Pong! "+client.ping+"ms");
	}
};