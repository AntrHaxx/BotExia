var Msg = function () {
	var _message;

	this.set = function (message) {
		_message = message;
	};

	this.send = function(message) {
		const embed = new Discord.RichEmbed()
		.setAuthor(_message.author.username, _message.author.avatarURL)
		.setDescription(message)
		.setColor(0x00AE86);

		_message.channel.send({embed});
	};

	this.valid = function(message) {
		const embed = new Discord.RichEmbed()
		.setAuthor(_message.author.username, _message.author.avatarURL)
		.setDescription(message)
		.setColor(0x00FF00);

		_message.channel.send({embed});
	};

	this.error = function(message) {
		const embed = new Discord.RichEmbed()
		.setAuthor(_message.author.username, _message.author.avatarURL)
		.setDescription(message)
		.setColor(0xFF0000);

		_message.channel.send({embed});
	};

	this.format = function(format) {
		const embed = new Discord.RichEmbed()
		.setAuthor(_message.author.username, _message.author.avatarURL)
		.setDescription(message)
		.setColor(0xFF0000);

		_message.channel.send({embed});
	};
};

module.exports = new Msg();