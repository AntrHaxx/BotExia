module.exports = {
	name: "test",
	alias: ["ta1", "ta2"],
	permissions: {
		"*": ["*"]
	},
	execute: function(message, args, client)
	{
		Command.call("ping");
		Command.call("vote", "result vote de test");
		Command.call("vote", args);
		Msg.info("Je suis un test et je sers a n'importe quoi!");
	}
};