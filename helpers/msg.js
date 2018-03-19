var Msg = function () {
	var _message;
	var _colors = {
		default: 0xCCCCCC,
		info: 0x33CCFF,
		success: 0x00FF00,
		warning: 0xFF6600,
		error: 0XFF0000
	};

	this.set = function (message) {
		_message = message;
	};

	this.channel_exists = function(channel) {
		return Client.channels.find('name', channel) != null;
	}

	this.info = function(message, target = null, type = "send") {
		return this.format({
			description: message,
			author: {
				name: _message.author.username,
				icon_url: _message.author.avatarURL
			},
			color: _colors.info
		}, target, type);
	};

	this.success = function(message, target = null, type = "reply") {
		return this.format({
			description: message,
			author: {
				name: _message.author.username,
				icon_url: _message.author.avatarURL
			},
			color: _colors.success
		}, target, type);
	};

	this.warning = function(message, target = null, type = "reply") {
		return this.format({
			description: message,
			author: {
				name: _message.author.username,
				icon_url: _message.author.avatarURL
			},
			color: _colors.warning
		}, target, type);
	};

	this.error = function(message, target = null, type = "reply") {
		return this.format({
			description: message,
			author: {
				name: _message.author.username,
				icon_url: _message.author.avatarURL
			},
			color: _colors.error
		}, target, type);
	};

	this.format = function(format, target = null, type = "send") {
		const embed = new Discord.RichEmbed();
		if (format.embed != undefined)
			format = format.embed;
		if (format.color != undefined)
		{
			if (_colors[format.color] != undefined)
				embed.setColor(_colors[format.color]);
			else
				embed.setColor(format.color);
		}
		else
			embed.setColor(_colors.info);
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
		{
			console.log("Channel "+target+" invalide");
			return false;
		}

		if (type == "send")
			if (target != null)
				Client.channels.find('name', target).send({embed});
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
		for (key in obj)
			return false;
		return true;
	};
};

module.exports = new Msg();