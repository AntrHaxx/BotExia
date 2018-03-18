var Msg = function () {
	var _message;

	this.set = function (message) {
		_message = message;
	};

	this.channel_exists = function(channel) {
		return global.client.channels.find('name', channel) != null;
	}

	this.send = function(message, target = null, type = "send") {
		return this.format({
			description: message,
			author: {
				name: _message.author.username,
				icon_url: _message.author.avatarURL
			},
			color: 0x00AE86
		}, type, target);
	};

	this.valid = function(messag, target = null, type = "reply") {
		return this.format({
			description: message,
			author: {
				name: _message.author.username,
				icon_url: _message.author.avatarURL
			},
			color: 0x00FF00
		}, type, target);
	};

	this.error = function(message, target = null, type = "reply") {
		return this.format({
			description: message,
			author: {
				name: _message.author.username,
				icon_url: _message.author.avatarURL
			},
			color: 0xFF0000
		}, type, target);
	};

	this.format = function(format, type = "send", target = null) {
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
		if (format.fields != undefined && typeof format.fields == "object" && format.fields != null)
		{
			for (data of format.fields)
			{
				if (data.name != undefined && data.value != undefined)
					embed.addField(data.name, data.value);
				else if(typeof data == 'boolean')
					embed.addBlankField(!data);
			}
		}

		if (is_empty(format) ||
			(target != null && !this.channel_exists(target)))
			return false;

		if (type == "send")
			if (target != null)
				global.client.channels.find('name', target).send({embed});
			else
				_message.channel.send({embed});
		else if (type == "reply")
			_message.reply({embed});
		else
		{
			console.log('Type de message invalide, choisissez entre "send" et "reply".');
			return false;
		}
		return true;
	};

	var is_empty = function(obj) {
		for (let key in obj)
			return false;
		return true;
	};
};

module.exports = new Msg();