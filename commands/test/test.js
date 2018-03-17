module.exports = {
	name: "test",
	alias: ["ta1", "ta2"],
	execute: function(message, args, client)
	{
		message.channel.send("Je suis un test et je sers a n'importe quoi!");
	}
};