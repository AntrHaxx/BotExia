module.exports = {
	name: "everyone",
	permissions: {
		"*": "*"
	},
	execute: function(message, args, client){
		args = args.join(" ");
		Msg.info("@everyone "+args, "*");
	}
};