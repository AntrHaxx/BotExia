// https://github.com/kelektiv/node-cron
const Cron = require('cron');
global.CronJobs = [];

module.exports = {
	name : 'cron',
	permissions: {
		"dm": "*",
		"*": ["none"]
	},
	execute(message = null, args, client) {
		if (this[args[0]] == undefined)
			return Msg.error("Instruction invalide");
		var instruction = args[0];
		var args = args.slice(1);
		this[instruction](args);
	},
	init: function() {
		var jobs = Load.json('cronjobs');
		if (!jobs.length)
			Log.warning("Aucun CronJob a charger");
		for (let i = 0; i < jobs.length && jobs[0] != null; i++)
		{
			let job = jobs[i];
			try {
				if (job.running)
				{
					CronJobs[i] = new Cron.CronJob(job.pattern, function() {
						try {
							Command.call(job.command, job.args);
						} catch(e) {
							Log.error("Erreur survenue lors de l'execution de la commande "+job.command, e);
						};
					}, null, true, 'Europe/Paris');
				}
			} catch(ex) {
				Log.error("Le pattern cron est invalide", ex);
			};
		}
		Log.info("Cron Jobs initialises");
	},
	add: function(args) {
		var jobs = Load.json('cronjobs');
		var pattern = args.slice(0, 6);
		var command = args[6];
		args = args.slice(7);

		if (jobs[0] != undefined && jobs[0] == null)
			jobs = [];
		if (pattern.length != 6)
			return Msg.error("Le pattern doit etre compose de six elements.");
		if (command == undefined || command == null || command == "")
			return Msg.error("Il faut definir une commande a executer");
		else if (Command.get(command) == null)
			return Msg.error("La commande entree en parametre est invalide");

		try {
			pattern = pattern.join(' ');
			CronJobs.push(new Cron.CronJob(pattern, function() {
				Command.call(command, args);
			}, null, false, 'Europe/Paris'));
			jobs.push({
				"pattern": pattern,
				"command": command,
				"args": args,
				"running": false
			});
			Msg.info("Cron Job ajoute!");
			obj = JSON.stringify(jobs);
			fs.writeFile('./json/cronjobs.json', obj, 'utf8', function () {});
		} catch(ex) {
			Log.error("Le pattern cron est invalide", ex);
		};
	},
	edit: function(args) {
		var job = parseInt(args[0]) - 1;
		var jobs = Load.json('cronjobs');
		var entry = args[1];
		var value = args.slice(2);

		if (jobs[job] == undefined)
			return Msg.error("Ce Cron Job n'existe pas");
		else if (jobs[job][entry] == undefined)
			return Msg.error("Entree invalide");
		if (entry != "args")
			value = value.join(' ');
		if (entry == "pattern" && value.length != 6)
			return Msg.error("Le pattern doit etre compose de six elements.");
		if (entry == "command" &&
			(command == undefined || command == null || command == ""))
			return Msg.error("Il faut definir une commande a executer");
		else if (Command.get(command) == null)
			return Msg.error("La commande entree en parametre est invalide");

		jobs[job][entry] = value;
		Msg.info("Cron Job modifie!");
		obj = JSON.stringify(jobs);
		fs.writeFile('./json/cronjobs.json', obj, 'utf8', function () {});
	},
	remove: function(args) {
		var job = parseInt(args[0]) - 1;
		var jobs = Load.json('cronjobs');
		if (jobs[job] == undefined)
			return Msg.error("Ce Cron Job n'existe pas");
		delete jobs[job];
		delete CronJobs[job];
		Msg.success("Cron Job efface");
		obj = JSON.stringify(jobs);
		fs.writeFile('./json/cronjobs.json', obj, 'utf8', function () {});
	},
	start: function(args) {
		var job = parseInt(args[0]) - 1;
		var jobs = Load.json('cronjobs');
		if (this.running(job, true))
			return Msg.info("Cron Job deja demarre");
		if (CronJobs[job] != undefined)
		{
			CronJobs[job].start();
			Msg.info("Cron Job demarre");
			jobs[job].running = true;
			obj = JSON.stringify(jobs);
			fs.writeFile('./json/cronjobs.json', obj, 'utf8', function () {});
		}
		else if (jobs[job] != undefined)
		{
			job = jobs[job];
			CronJobs[args[0]] = new Cron.CronJob(job.pattern, function() {
				Command.call(job.command, job.args);
			}, null, true, 'Europe/Paris');
			Msg.info("Cron Job demarre");
			jobs[parseInt(args[0]) - 1].running = true;
			obj = JSON.stringify(jobs);
			fs.writeFile('./json/cronjobs.json', obj, 'utf8', function () {});
		}
		else
			Msg.error("Le Cron Job n'existe pas");
	},
	stop: function(args) {
		var job = parseInt(args[0]) - 1;
		var jobs = Load.json('cronjobs');
		if (!this.running(job, true))
			return Msg.info("Ce Cron Job n'est pas actif");
		if (CronJobs[job] != undefined)
		{
			CronJobs[job].stop();
			Msg.info("Cron Job arrete");
			jobs[job].running = false;
			obj = JSON.stringify(jobs);
			fs.writeFile('./json/cronjobs.json', obj, 'utf8', function () {});
		}
		else
			Msg.error("Le Cron Job n'existe pas");
	},
	list: function(args) {
		var jobs = Load.json('cronjobs');
		var fields = [];
		let active = args[0] != undefined && args[0] == "active" ? true : false;
		for (let i = 0; i < jobs.length && jobs[0] != null; i++)
		{
			if (active && !this.running(i, true))
				continue;
			let job = jobs[i];
			fields.push({
				name: (i + 1)+") "+job.pattern,
				value: "**"+job.command+"** "+job.args.join(' ')
			});
		}
		if (!fields.length)
			return Msg.warning("Aucun Cron Job "+(active ? "actif" : "cree"));
		Msg.format({
			color: "info",
			author: {
				name: "Cron Jobs",
				icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Icons8_flat_alarm_clock.svg/2000px-Icons8_flat_alarm_clock.svg.png"
			},
			description: "Liste des Cron Jobs "+(active ? "actifs:" : "crees:"),
			fields: fields
		});
	},
	running: function(args, mute = false) {
		var job = typeof args == "number" ? args : parseInt(args[0]) - 1;
		if (CronJobs[job] != undefined)
		{
			var actif = CronJobs[job].running ? "actif" : "inactif";
			if (!mute)
				Msg.info("Cron Jon "+actif);
			return CronJobs[job].running;
		}
		else
			if (!mute)
				Msg.error("Le Cron Job n'existe pas");
		return false;
	}
};