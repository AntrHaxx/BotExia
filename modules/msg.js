var Msg = function () {
    // Couleurs par defaut.
    var _colors = {
        default: 0xCCCCCC,
        info: 0x33CCFF,
        success: 0x00FF00,
        warning: 0xFF6600,
        error: 0XFF0000,
        kivaferkoi: 0x196F3D,
        motcle: 0xF4D03F,
        contraintes: 0xF1C40F,
        pbm: 0xD4AC0D,
        hypothese: 0xB7950B,


    };

    /*
    **	Is Empty
    **	Verifie si un objet est vide
    **
    **	@param	obj [obj]	Objet a tester
    **	@return 	[bool]	TRUE si l'objet est vide, sinon FALSE
    */
    var _is_empty = function (obj) {
        for (key in obj)
            return false;
        return true;
    };

    /*
    **	Channel Exists
    **	Verifie si un channel existe
    **
    **	@param	channel [str]	Nom du channel a chercher
    **	@return 		[bool]	TRUE si le channel existe, sinon FALSE
    */
    this.channel_exists = function (channel) {
        return client.channels.find('name', channel) != null;
    }

    /*
    **	Info
    **	Affiche un message sur Discord avec le preformatage INFO
    **
    **	@param	message 	[str]	Message a afficher sur Discord
    **	@param	target		[str]	Si defini, channel de destination
    **	@param	type 		[str]	Type de message (send/reply)
    **	@return 			[bool]	TRUE si message bien envoye, sinon FALSE
    */
    this.info = function (message, target = null, type = "send") {
        message = Lng.parse(message);
        return this.format({
            description: message,
            author: {
                name: global.message.author.username,
                icon_url: global.message.author.avatarURL
            },
            color: _colors.info
        }, target, type);
    };

    /*
    **	Success
    **	Affiche un message sur Discord avec le preformatage SUCCESS
    **
    **	@param	message 	[str]	Message a afficher sur Discord
    **	@param	target		[str]	Si defini, channel de destination
    **	@param	type 		[str]	Type de message (send/reply)
    **	@return 			[bool]	TRUE si message bien envoye, sinon FALSE
    */
    this.success = function (message, target = null, type = "reply") {
        message = Lng.parse(message);
        return this.format({
            description: message,
            author: {
                name: global.message.author.username,
                icon_url: global.message.author.avatarURL
            },
            color: _colors.success
        }, target, type);
    };

    /*
    **	Warning
    **	Affiche un message sur Discord avec le preformatage WARNING
    **
    **	@param	message 	[str]	Message a afficher sur Discord
    **	@param	target		[str]	Si defini, channel de destination
    **	@param	type 		[str]	Type de message (send/reply)
    **	@return 			[bool]	TRUE si message bien envoye, sinon FALSE
    */
    this.warning = function (message, target = null, type = "reply") {
        message = Lng.parse(message);
        return this.format({
            description: message,
            author: {
                name: global.message.author.username,
                icon_url: global.message.author.avatarURL
            },
            color: _colors.warning
        }, target, type);
    };

    /*
    **	Error
    **	Affiche un message sur Discord avec le preformatage ERROR
    **
    **	@param	message 	[str]	Message a afficher sur Discord
    **	@param	target		[str]	Si defini, channel de destination
    **	@param	type 		[str]	Type de message (send/reply)
    **	@return 			[bool]	TRUE si message bien envoye, sinon FALSE
    */
    this.error = function (message, target = null, type = "reply") {
        message = Lng.parse(message);
        return this.format({
            description: message,
            author: {
                name: global.message.author.username,
                icon_url: global.message.author.avatarURL
            },
            color: _colors.error
        }, target, type);
    };

    /*
    **	Kivaferkoi
    **	Affiche un message sur Discord avec le preformatage KIVAFERKOI
    **
    **	@param	message 	[str]	Message a afficher sur Discord
    **	@param	target		[str]	Si defini, channel de destination
    **	@param	type 		[str]	Type de message (send/reply)
    **	@return 			[bool]	TRUE si message bien envoye, sinon FALSE
    */
    this.kivaferkoi = function (message, target = null, type = "send") {
        message = Lng.parse(message);
        return this.format({
            title: "Les personnes ayant a faire une partie sont : \n",
            description: message,
            author: {
                name: global.message.author.username,
                icon_url: global.message.author.avatarURL
            },
            color: _colors.kivaferkoi
        }, target, type);
    };

    /*
	  **	Mot clés
	  **	Affiche un message sur Discord avec le preformatage MOTCLE
	  **
	  **	@param	message 	[str]	Message a afficher sur Discord
	  **	@param	target		[str]	Si defini, channel de destination
	  **	@param	type 		[str]	Type de message (send/reply)
	  **	@return 			[bool]	TRUE si message bien envoye, sinon FALSE
	  */
    this.motcle = function (message, target = null, type = "send") {
        message = Lng.parse(message);
        return this.format({
            title: "Les personnes ayant a trouver un mot clée sont : \n",
            description: message,
            author: {
                name: global.message.author.username,
                icon_url: global.message.author.avatarURL
            },
            color: _colors.motcle
        }, target, type);
    };

    /*
	  **	Contraintes
	  **	Affiche un message sur Discord avec le preformatage CONTRAINTES
	  **
	  **	@param	message 	[str]	Message a afficher sur Discord
	  **	@param	target		[str]	Si defini, channel de destination
	  **	@param	type 		[str]	Type de message (send/reply)
	  **	@return 			[bool]	TRUE si message bien envoye, sinon FALSE
	  */
    this.contraintes = function (message, target = null, type = "send") {
        message = Lng.parse(message);
        return this.format({
            title: "Les personnes ayant a trouver une contrainte sont : \n",
            description: message,
            author: {
                name: global.message.author.username,
                icon_url: global.message.author.avatarURL
            },
            color: _colors.contraintes
        }, target, type);
    };

    /*
	  **	Pbm
	  **	Affiche un message sur Discord avec le preformatage PBM
	  **
	  **	@param	message 	[str]	Message a afficher sur Discord
	  **	@param	target		[str]	Si defini, channel de destination
	  **	@param	type 		[str]	Type de message (send/reply)
	  **	@return 			[bool]	TRUE si message bien envoye, sinon FALSE
	  */
    this.pbm = function (message, target = null, type = "send") {
        message = Lng.parse(message);
        return this.format({
            title: "Les personnes ayant a trouver une problématique sont : \n",
            description: message,
            author: {
                name: global.message.author.username,
                icon_url: global.message.author.avatarURL
            },
            color: _colors.pbm
        }, target, type);
    };

    /*
	  **	Hypothèses
	  **	Affiche un message sur Discord avec le preformatage HYPOTHESES
	  **
	  **	@param	message 	[str]	Message a afficher sur Discord
	  **	@param	target		[str]	Si defini, channel de destination
	  **	@param	type 		[str]	Type de message (send/reply)
	  **	@return 			[bool]	TRUE si message bien envoye, sinon FALSE
	  */
    this.hypothese = function (message, target = null, type = "send") {
        message = Lng.parse(message);
        return this.format({
            title: "Les personnes ayant a trouver une hypothese sont : \n",
            description: message,
            author: {
                name: global.message.author.username,
                icon_url: global.message.author.avatarURL
            },
            color: _colors.hypothese
        }, target, type);
    };

    /*
    **	Format
    **	Affiche un message enrichi sur Discord
    **
    **	@param	format 	[onj]	Objet avec le contenu a afficher sur Discord
    **	@param	target	[mixed]	Nom du channel cible
    **							[ch1, ch2, chN] envoie sur les channels cibles
    **							"*" Envoie sur tous les channels
    **	@param	type 	[str]	Type de message (send/reply)
    **	@return 		[bool]	TRUE si message bien envoye, sinon FALSE
    */
    this.format = function (format, target = null, type = "send") {
        const embed = new Discord.RichEmbed();
        if (format.embed != undefined)
            format = format.embed;
        if (format.color != undefined) {
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
        if (format.author != undefined) {
            let name = format.author.name != undefined ? format.author.name : "";
            let icon_url = format.author.icon_url != undefined ? format.author.icon_url : "";
            embed.setAuthor(name, icon_url);
        }
        if (format.footer != undefined) {
            let text = format.footer.text != undefined ? format.footer.text : "";
            let icon_url = format.footer.icon_url != undefined ? format.footer.icon_url : "";
            embed.setFooter(text, icon_url);
        }
        if (format.fields != undefined && typeof format.fields == "object" && format.fields != null) {
            for (data of format.fields) {
                if (data.name != undefined && data.value != undefined)
                    embed.addField(data.name, data.value);
                else if (typeof data == 'boolean')
                    embed.addBlankField(!data);
            }
        }

        if (_is_empty(format) ||
            (typeof target != "object" && target != '*' && !this.channel_exists(target))) {
            Log.error("Channel " + target + " invalide");
            return false;
        }

        if (type == "send")
            if (target != null) {
                if (typeof target == "object")
                    for (tg of target) {
                        tg = client.channels.find('name', tg);
                        if (tg != null)
                            tg.send({embed});
                    }
                else if (target == "*")
                    client.channels.forEach(function (elm, key, map) {
                        if (typeof elm.send == "function")
                            elm.send({embed});
                    });
                else
                    client.channels.find('name', target).send({embed});
            }
            else
                global.message.channel.send({embed});
        else if (type == "reply")
            global.message.reply({embed});
        else {
            Log.error('Type de message invalide, choisissez entre "send" et "reply".');
            return false;
        }
        return true;
    };
};

module.exports = new Msg();