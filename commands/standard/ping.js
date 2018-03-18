module.exports = {
	name : 'ping',
	execute(message, args, client){
		global.Msg.send("Pong! "+client.ping+"ms");
	}
};