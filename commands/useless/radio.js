global.loaded_radio = null;
global.radio_instance = null;
global.radio_volume = 100;

module.exports = {
	name : 'radio',
	permissions: {
		"*": "*"
	},
	execute(message = null, args = null, client = null){
		var instruction = args[0];
		args = args.slice(1);
		if (message.member.voiceChannel) {
			if (this[instruction] == undefined)
				return Msg.error("instruction invalide");
			this[instruction](args);
		} else {
			Msg.error("Cette commande doit etre lancee depuis un channel vocal.");
		}
	},
	add: function(args) {
		let type = args[0];
		let name = args.slice(1, -1).join(" ");
		let url = args[args.length - 1];
		if (type == undefined || name == undefined || url == undefined)
			return Msg.error("Vuilles saisir toutes les informations necessaires");
		let radios = Load.json("radios", type);
		if (radios == null)
			radios = {};
		if (radios[name] != undefined)
			return Msg.error("Une frequence portant le nom "+name+" existe deja dans la station "+type);
		radios[name] = {
			"name": name,
			"url": url
		};
		File.write("json/radios/"+type+".json", radios, function() {
			Msg.success("Frequence ajoutee avec success");
		});
	},
	edit: function(args) {
		let type = args[0];
		let name = args.slice(1);
	},
	remove: function(args) {
		let type = args[0];
		let name = args.slice(1);
		let data = Load.json("radios", type);
		if (data == null || data[name] == undefined)
			return Msg.error("Station radio non trouvee");
		delete data[name];
		data = JSON.stringify(data);
		File.write("json/radios/"+type+".json", data);
	},
	play: function(args) {
		let radio = null;
		let type = args[0];
		args = args.slice(1).join(' ');
		if (!args.length && loaded_radio != null)
			radio = loaded_radio;
		if (radio == null)
		{
			if (!args.length)
				return Msg.error("Aucune radio chargee");
			if (type == undefined)
				return Msg.error("Station non trouvee");
			radio = Load.json("radios", type);
			if (radio[args] == undefined)
				return Msg.error("Frequence non trouvee");
			radio = radio[args];
			loaded_radio = radio;
			loaded_radio.src = type;
		}
		message.member.voiceChannel.join()
		.then(connection => {
			require('http').get(radio.url, (res) => {
				radio_instance = connection.playStream(res);
			});
			Msg.success("Frequence "+type+" - "+radio.name+" lancee !");
        })
		.catch(console.log);
	},
	playing: function() {
		if (radio_instance == null)
			return Msg.error("Aucune radio chargee");
		Msg.format({
			title: "Bot FM | Station Chargee",
			descriptiohn: loaded_radio.src+" - "+loaded_radio.name,
			thumbnail: "https://www.android-user.de/wp-content/uploads/2014/04/35618-electro-swing-revolution-icon.png"
		});
	},
	stop: function() {
		radio_instance.destroy();
	},
	list: function(args) {
		let srcs = Load.root("json/radios");
		let prefix = typeof config.prefix == "object" ? config.prefix[0] : config.prefix;
		Msg.format({
			title: "Stations Radio",
			description: "**Bot FM**",
			"thumbnail": "https://www.android-user.de/wp-content/uploads/2014/04/35618-electro-swing-revolution-icon.png"
		});
		for (let src of srcs)
		{
			if (args.length && args[0] != src.replace('.json', ''))
				continue
			let fields = [];
			let stations = Load.json("radios", src);
			for (let station in stations)
			{
				fields.push({
					"name": "> "+station,
					"value": "`"+prefix+"radio play "+src.replace('.json', "")+" "+station+"`"
				});
			}
			if (stations != null)
				Msg.format({
					"description": "**"+src.replace('.json', "").toUpperCase()+"**",
					"fields": fields
				});
		}
	},
	volume: function(args) {
		if (!args.length && typeof args != "number")
			Msg.info("Le volume actuel est de "+(radio_volume * 100));
		else if (radio_instance != null)
		{
			if (typeof args == "object" && typeof args != "number")
				args = parseInt(args.join(''));
			args = args > 100 ? 100 : args;
			radio_volume = args / 100;
			radio_instance.setVolume(radio_volume);
		}
	},
	vol: function(args) {
		this.volume(args);
	}
};