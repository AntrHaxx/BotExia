var has_voted = function(id, options) {
	for (let i = 0; i < options.length; i++)
	{
		if (options[i].votes.includes(id))
			return i;
	}
	return -1;
};

var is_empty = function(obj) {
	for (key in obj)
		return false;
	return true;
};

var find = function(message, args = [], client) {
	args = args.join(' ');
	var data = Load.json('votes');
	if (data[args] != undefined)
		return data[args];
	return null;
}

module.exports = {
	name : 'vote',
	permissions: {
		"*": "*"
	},
	execute(message, args, client){
		const instruction = args[0];
		args = args.slice(1);
		if (this[instruction] != undefined
			&& typeof this[instruction] == 'function'
				&& instruction != 'execute')
			this[instruction](message, args, client);
		else
			Msg.error('***'+instruction+'*** n\'est pas une instruction valide.');
	},

	create: function(message, args, client) {
		args = args.join(' ');
		args = args.split('```');
		let regex = new RegExp('\n', "g");
		var options = args[3].split('\n');;
		var vote = {
			"name": args[0].replace(regex, ''),
			"description": args[1].replace(regex, ''),
			"date": new Date(),
			"owner": message.author.id,
			"closed": 0,
			"options": []
		};
		for (option of options)
		{
			if (option != '')
			{
				vote.options.push({
					"label": option.replace(regex, ''),
					"votes": []
				});
			}
		}
		var obj = require('../../json/votes.json');
		if (obj[vote.name] != undefined)
			return Msg.error('Un sondage avec ce nom existe deja');
		obj[vote.name] = vote;
		obj = JSON.stringify(obj);
		Msg.success('Vote cree avec succes');
		fs.writeFile('./json/votes.json', obj, 'utf8', function () {});
	},

	update: function(message, args, client) {
		let regex = new RegExp('\n', "g");
		var data = require('../../json/votes.json');
		args = args.join(' ').split('```');
		let vote = args[0].replace(regex, '');
		let name = null;
		let description = null;
		let options = null;
		args = args.slice(1);
		if (is_empty(data))
			return Msg.error('Aucun sondage cree a ce jour.');
		else if (data[vote] != null && data[vote].owner != message.author.id)
			return Msg.error('Vous ne disposez pas des permissions requises pour cette action.');
		else if (data[vote] == null)
			return Msg.error('Sondage non trouve.');
		for (value of args)
		{
			if (value == '' || value == '\n')
				continue;
			value = value.split('\n');
			if (value[0] == 'n')
				name = value.slice(1).join(' ').replace(regex, '');
			else if (value[0] == 'd')
				description = value.slice(1).join(' ').replace(regex, '');
			else if (value[0] == 'o')
				options = value.slice(1);
		}
		if (name != null && name != '')
			data[vote].name = name;
		if (description != null && description != '')
			data[vote].description = description;
		let j = 0;
		for (let i = 0; i < options.length; i++)
		{
			if (options[i] != '' && options[i] != '*')
			{
				if (data[vote].options[j] == undefined)
					data[vote].options[j] = {label: options[i], votes: []};
				else
					data[vote].options[j].label = options[i];
			}
			if (options[i] != '')
				j++;
		}
		data = JSON.stringify(data);
		Msg.success("Sondage mis a jour avec succes");
		global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
	},

	remove: function(message, args, client) {
		args = args.join(' ');
		var data = require('../../json/votes.json');
		if (is_empty(data))
			Msg.error('Aucun sondage cree a ce jour.');
		else if (data[args] != null && data[args].owner != message.author.id)
			Msg.error('Vous ne disposez pas des permissions requises pour cette action.');
		else if (data[args] == null)
			Msg.error('Sondage non trouve.');
		else
		{
			delete data[args];
			data = JSON.stringify(data);
			Msg.success('Vote efface avec succes');
			global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
		}
	},

	open: function(message, args, client) {
		args = args.join(' ');
		var data = require('../../json/votes.json');
		if (is_empty(data))
			Msg.error('Aucun sondage cree a ce jour.');
		else if (data[args] != null && data[args].owner != message.author.id)
			Msg.error('Vous ne disposez pas des permissions requises pour cette action.');
		else if (data[args] == null)
			Msg.error('Sondage non trouve.');
		data[args].closed = 0;
		data = JSON.stringify(data);
		Msg.success('Sondage ouvert au vote');
		global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
	},

	close: function(message, args, client) {
		args = args.join(' ');
		var data = require('../../json/votes.json');
		if (is_empty(data))
			Msg.error('Aucun sondage cree a ce jour.');
		else if (data[args] != null && data[args].owner != message.author.id)
			Msg.error('Vous ne disposez pas des permissions requises pour cette action.');
		else if (data[args] == null)
			Msg.error('Sondage non trouve.');
		data[args].closed = 1;
		data = JSON.stringify(data);
		Msg.success('Sondage ferme au vote');
		global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
	},

	my: function(message, args, client) {
		var data = find(message, args, client);	
		if (data != null)
		{
			var index = has_voted(message.author.id, data.options);
			if (index != -1)
			{
				let user = client.users.find('id', data.owner).username;
				let avatar = client.users.find('id', data.owner).avatarURL;
				let date = new Date(data.date);
				date = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' ('+date.getHours()+':'+date.getMinutes()+')';

				Msg.format({
					title: data.name,
					author: {name: user+" | "+date, avatar},
					fields: [{name: "Vous avez vote pour l'option:", value: "**"+(index + 1)+")** "+data.options[index].label}],
					color: data.closed ? 0xFF0000 : 0x00FF00
				});
			}
			else
				Msg.error('Vous n\'avez pas vote pour ce sondage');
		}
		else
			Msg.error('Sondage non trouve.');
	},

	list: function(message, args = [], client) {
		args = args.join(' ');
		let self = this;
		fs.readFile('./json/votes.json', 'utf8', function readFileCallback(err, data){
			if (err)
				console.log(err);
			else
			{
				obj = JSON.parse(data);
				if (!is_empty(obj))
				{
					let regex = new RegExp('\n', "g");
					if (args != '' && obj[args] != undefined)
						return self.result(message, args.split(' '), client);
					else if (args != '' && obj[args] == undefined)
						return Msg.error('Sondage non trouve.');
					for (key in obj)
					{
						let user = client.users.find('id', obj[key].owner).username;
						let avatar = client.users.find('id', obj[key].owner).avatarURL;
						let date = new Date(obj[key].date);
						date = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' ('+date.getHours()+':'+date.getMinutes()+')';

						Msg.format({
							title: obj[key].name,
							author: {name: user+" | "+date, icon_url: avatar},
							color: obj[key].closed ? 0xFF0000 : 0x00FF00,
						});
					}
				}
				else
					Msg.error('Aucun sondage cree a ce jour.');
			}
		});
	},

	choose: function(message, args, client) {
		if (args.length < 2)
			return Msg.error('Choisissez un vote et une option de reponse.');
		let data = require('../../json/votes.json');
		let option = args[args.length - 1] - 1;
		args = args.slice(0, args.length - 1).join(' ');
		if (is_empty(data))
			return Msg.error('Aucun sondage publie a ce jour.');			
		else if (data[args] == null)
			return Msg.error('Le vote choisi est invalide');
		else if (data[args].options[option] == undefined)
			return Msg.error('L\'option choisie est invalide.');
		else if (data[args].closed)
			return Msg.error('Ce sondage est ferme au vote');
		else if (data[args].options[option].votes.includes(message.author.id))
		{
			let index = data[args].options[option].votes.indexOf(message.author.id);
			data[args].options[option].votes.splice(index, 1);
			Msg.info('Vous avez annule votre vote.');
		}
		else
		{
			let voted = has_voted(message.author.id, data[args].options);
			if (voted == -1)
			{
				data[args].options[option].votes.push(message.author.id);
				Msg.success('Vote enregistre');
			}
			else
			{
				let index = data[args].options[voted].votes.indexOf(message.author.id);
				data[args].options[voted].votes.splice(index, 1);
				data[args].options[option].votes.push(message.author.id);
				Msg.success('Vote modifie');
			}
		}
		data = JSON.stringify(data);
		global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
	},

	result: function(message, args, client) {
		data = find(message, args, client);
		if (data != null)
		{
			let user = client.users.find('id', data.owner).username;
			let avatar = client.users.find('id', data.owner).avatarURL;
			let date = new Date(data.date);
			date = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' ('+date.getHours()+':'+date.getMinutes()+')';

			Msg.format({
				title: data.name,
				author: {name: user+" | "+date, avatar},
				description: data.description,
				color: data.closed ? 0xFF0000 : 0x00FF00,
				thumbnail: "https://www.soils.org/files/images/science-policy/check-box.png",
				footer: {
					text: data.closed ? "Sondage Ferme" : "Sondage Ouvert",
					icon_url: data.closed ? "http://www.csw-iba.org/swfu/d/lock.png" : "http://icons.iconarchive.com/icons/double-j-design/diagram-free/128/lock-unlock-icon.png"
				}
			});

			for (let i = 0; i < data.options.length; i++)
			{
				let option = (i + 1)+") "+data.options[i].label;
				let votes = "**"+data.options[i].votes.length+"** voix";
				Msg.format({
					author: {
						name: option
					},
					description: votes,
					footer: {
						text: "Vote: "+data.name
					}
				});
			}
		}
		else
			Msg.error('Aucun vote ne correspond a votre recherche.');
	}
};