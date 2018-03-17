var has_voted = function(id, options)
{
	for (let i = 0; i < options.length; i++)
	{
		if (options[i].votes.includes(id))
			return i;
	}
	return -1;
};

function is_empty(obj) {
	for (key in obj)
		return false;
	return true;
};

module.exports = {
	name : 'vote',
	description : "Permet de gerer un systeme de vote",
	usage :'`*vote <instruction> <parametres>`\n'+
	'***Instructions:***\n'+
	'***CREATE***\n'+
	'Cree un nouveau sobdage\n'+
	'```md\n*vote create <nom> \`\`\`<description>\`\`\` \`\`\`<options>\`\`\` \n```\n'+
	'***UPDATE***\n'+
	'Permet de modifier les donnees d\'un sondage\n'+
	'`*vote update <nomActuel> \`\`\`n <nouveauNom>\`\`\` \`\`\`d <nouvelleDescription>\`\`\` \`\`\`o <nouvellesOptions>\`\`\` `\n'+
	'- Les champs a remplacer sont tous optionnels.\n'+
	'- Si vous souhaitez conserver une de vos options, indiquez * a son emplacement.\n'+
	'***REMOVE***\n'+
	'Efface un sondage\n'+
	'`*vote remove <nomDuSondage>`\n'+
	'Vous devez etre le createur du sondage vise pour l\'effacer.\n'+
	'***OPEN***\n'+
	'Ouvre un sondage aux votes\n'+
	'`*vote open <nomDuSondage>`\n'+
	'Vous devez etre le createur du sondage vise pour l\'ouvrir.\n'+
	'***CLOSE***\n'+
	'Ferme un sondage aux votes\n'+
	'`*vote close <nomDuSondage>`\n'+
	'Vous devez etre le createur du sondage vise pour le fermer.\n'+
	'***CHOOSE***\n'+
	'Permet de voter pour une des options d\'un sondage\n'+
	'` *vote choose <nomDuSondage> <numeroOption>`\n'+
	'- Pour retirer votre vote specifiez le numero de l\'option pour laquelle vous avez vote. Retrouvez votre choix grace a la commande `*vote my <nomDuSondage>`\n'+
	'- Pour changer de vote indiquez le numero de la nouvelle option.\n'+
	'***MY***\n'+
	'Affiche l\'option pour laquelle vous avez vote\n'+
	'`*vote my <nomDuSondage> `\n'+
	'***LIST***\n'+
	'Affiche la liste des sondages\n'+
	'`*vote list <nomDuSondage> `\n'+
	'- Si le nom du sondage est specifie, seul ce dernier sera affiche.\n'+
	'***RESULT***\n'+
	'Affiche les resultats d\'un sondage\n'+
	'`*vote result <nomDuSondage> `\n',
	execute(message, args, client){
		const instruction = args[0];
		args = args.slice(1);
		if (this[instruction] != undefined
			&& typeof this[instruction] == 'function'
				&& instruction != 'execute')
			this[instruction](message, args, client);
		else
			message.reply('***'+instruction+'*** n\'est pas une instruction valide.');
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
			return message.reply('Un sondage avec ce nom existe deja');
		obj[vote.name] = vote;
		obj = JSON.stringify(obj);
		global.fs.writeFile('./json/votes.json', obj, 'utf8', function () {
			message.channel.send('Vote cree avec succes');
		});
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
			message.reply('Aucun sondage cree a ce jour.');
		else if (data[vote] != null && data[vote].owner != message.author.id)
			return message.reply('Vous ne disposez pas des permissions requises pour cette action.');
		else if (data[vote] == null)
			return message.reply('Sondage non trouve.');
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
		global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
	},

	remove: function(message, args, client) {
		args = args.join(' ');
		var data = require('../../json/votes.json');
		if (is_empty(data))
			message.reply('Aucun sondage cree a ce jour.');
		else if (data[args] != null && data[args].owner != message.author.id)
			message.reply('Vous ne disposez pas des permissions requises pour cette action.');
		else if (data[args] == null)
			message.reply('Sondage non trouve.');
		else
		{
			delete data[args];
			data = JSON.stringify(data);
			message.reply('Vote efface avec succes');
			global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
		}
	},

	open: function(message, args, client) {
		args = args.join(' ');
		var data = require('../../json/votes.json');
		if (is_empty(data))
			message.reply('Aucun sondage cree a ce jour.');
		else if (data[args] != null && data[args].owner != message.author.id)
			message.reply('Vous ne disposez pas des permissions requises pour cette action.');
		else if (data[args] == null)
			message.reply('Sondage non trouve.');
		data[args].closed = 0;
		data = JSON.stringify(data);
		message.reply('Sondage ouvert au vote');
		global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
	},

	close: function(message, args, client) {
		args = args.join(' ');
		var data = require('../../json/votes.json');
		if (is_empty(data))
			message.reply('Aucun sondage cree a ce jour.');
		else if (data[args] != null && data[args].owner != message.author.id)
			message.reply('Vous ne disposez pas des permissions requises pour cette action.');
		else if (data[args] == null)
			message.reply('Sondage non trouve.');
		data[args].closed = 1;
		data = JSON.stringify(data);
		message.reply('Sondage ferme au vote');
		global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
	},

	my: function(message, args, client) {
		var data = this.find(message, args, client);	
		if (data != null)
		{
			var index = has_voted(message.author.id, data.options);
			if (index != -1)
			{
				var label = data.options[index].label;
				message.reply('Vous avez vote pour l\'option '+(index + 1)+': ***'+label+'***');
			}
			else
				message.reply('Vous n\'avez pas vote pour ce sondage');
		}
		else
			message.reply('Sondage non trouve');
	},

	list: function(message, args = [], client) {
		args = args.join(' ');
		global.fs.readFile('./json/votes.json', 'utf8', function readFileCallback(err, data){
			if (err)
				console.log(err);
			else
			{
				obj = JSON.parse(data);
				if (!is_empty(obj))
				{
					let regex = new RegExp('\n', "g");
					let msg = '';
					if (args != '' && obj[args] == undefined)
						return message.reply('Sondage non trouve.');
					for (key in obj)
					{
						if (args != '' && obj[key].name != args)
							continue;
						let user = client.users.find('id', obj[key].owner).username;
						let date = new Date(obj[key].date);
						date = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' ('+date.getHours()+':'+date.getMinutes()+')';
						msg += date+' | '+obj[key].name+'\n'+
						'***Auteur:*** '+user+' | ***Etat:*** '+(obj[key].closed ? 'Ferme' : 'Ouvert')+'\n\n';
					}
					message.channel.send(msg);
				}
				else
					message.channel.send('Aucun sondage cree a ce jour.');
			}
		});
	},

	find: function(message, args = [], client) {
		args = args.join(' ');
		var data = require('../../json/votes.json');
		if (data[args] != undefined)
			return data[args];
		return null;
	},

	choose: function(message, args, client) {
		if (args.length < 2)
			return message.reply('Choisissez un vote et une option de reponse.');
		let data = require('../../json/votes.json');
		let option = args[args.length - 1] - 1;
		args = args.slice(0, args.length - 1).join(' ');
		if (is_empty(data))
			message.reply('Aucun sondage publie a ce jour.');			
		else if (data[args] == null)
			return message.reply('Le vote choisi est invalide');
		else if (data[args].options[option] == undefined)
			return message.reply('L\'option choisie est invalide.');
		else if (data[args].closed)
			return message.reply('Ce sondage est ferme au vote');
		else if (data[args].options[option].votes.includes(message.author.id))
		{
			let index = data[args].options[option].votes.indexOf(message.author.id);
			data[args].options[option].votes.splice(index, 1);
			message.reply('Vous avez annule votre vote.');
		}
		else
		{
			let voted = has_voted(message.author.id, data[args].options);
			if (voted == -1)
			{
				data[args].options[option].votes.push(message.author.id);
				message.reply('Vote enregistre');
			}
			else
			{
				let index = data[args].options[voted].votes.indexOf(message.author.id);
				data[args].options[voted].votes.splice(index, 1);
				data[args].options[option].votes.push(message.author.id);
				message.reply('Vote modifie');
			}
		}
		data = JSON.stringify(data);
		global.fs.writeFile('./json/votes.json', data, 'utf8', function () {});
			
	},

	result: function(message, args, client) {
		data = this.find(message, args, client);
		if (data != null)
		{
			let user = client.users.find('id', data.owner).username;
			let date = new Date(data.date);
			date = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' ('+date.getHours()+':'+date.getMinutes()+')';
			let msg = date+" | ***"+data.name+"***\n"+
			data.description+"\n"+
			'***Auteur:*** '+user+' | ***Etat:*** '+(data.closed ? 'Ferme' : 'Ouvert')+'\n'+
			"***Resultats:***\n";
			for(let i = 0; i < data.options.length; i++)
				msg += (i+1)+") "+data.options[i].label+" **"+data.options[i].votes.length+"**\n";
			message.channel.send(msg);
		}
		else
			message.channel.send('Aucun vote ne correspond a votre recherche.');
	}
};