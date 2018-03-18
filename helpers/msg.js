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
		const embed = new Discord.RichEmbed();
		if (format.color != undefined)
			embed.setColor(format.color);
		if (format.title != undefined)
			embed.setTitle(format.title);
		if (format.description != undefined)
			embed.setDescription(format.description);
		if (format.thumbnail != undefined)
			embed.setThumbnail(format.thumbnail);
		if (format.image != undefined)
			embed.setImage(format.image);
		if (format.url != undefined)
			embed.setImage(format.url);
		if (format.timestamp != undefined)
			embed.setTimestamp();
		if (format.author != undefined)
		{
			let name = format.author.name != undefined ? format.author.name : null;
			let icon_url = format.author.icon_url != undefined ? format.author.icon_url : null;
			embed.setAuthor(name, icon_url);
		}
		if (format.footer != undefined)
		{
			let text = format.author.icon_url != undefined ? format.footer.text : null;
			let icon_url = format.author.icon_url != undefined ? format.footer.icon_url : null;
			embed.setFooter(text, icon_url);
		}
		if (format.fields != undefined && typeof format.fields == "array")
		{
			for (data in format.fields)
			{
				if (data.name != undefined && data.value != undefined)
					embed.addField(data.name, data.value);
				else if(typeof data == 'boolean')
					embed.addBlankField(data);
			}
		}

		_message.channel.send({embed});
	};
};

module.exports = new Msg();