var Load = function()
{
	var	_merge_args = function(args)
	{
		let arr = [];
		for (let arg in args)
			arr.push(args[arg]);
		return arr.join('/');
	};

	this.is_file = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		return fs.lstatSync('./'+path).isFile();
	};

	this.is_directory = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		return fs.lstatSync('./'+path).isDirectory();
	};

	this.root = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		try {
			if (this.is_file(path))
				var data = require("../"+path);
			else if (this.is_directory(path))
				var data = fs.readdirSync('./'+path);
		} catch(e) {
			if (global.Log != undefined)
				global.Log.error("Erreur de chargement", e);
			else
				console.log("Erreur de chargement du fichier "+path+":\n"+e);
			return null;
		};
		return data;
	};

	this.module = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		if (path.substr(-3, 3) != ".js")
			path += ".js";
		return this.root("modules/"+path);
	};

	this.helper = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		if (path.substr(-3, 3) != ".js")
			path += ".js";
		return this.module("helpers/"+path);
	};

	this.json = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		if (path.substr(-5, 5) != ".json")
			path += ".json";
		return this.root("json/"+path);
	};

	this.help = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		if (path.doc != undefined)
			return help.doc;
		return this.json("docs/commands/"+path);
	};

	this.language = function(lng = null, entry = null)
	{
		let entries = {};
		folders = fs.readdirSync('./json/languages/');
		for (folder of folders)
		{
			if (lng != undefined && lng != null && lng != folder)
				continue;
			try {
				var files = fs.readdirSync('./json/languages/'+folder+"/");
			} catch (e) {
				Log.error("Impossible de charger la langue "+lng, e);
				return null;
			}
			entries[folder] = {};
			for (file in files)
			{
				let json = require("../json/languages/"+folder+"/"+files[file]);
				for (entry in json)
				{
					entries[folder][entry] = json[entry];
				}
			}
			if (lng != undefined && lng != null && lng == folder)
			{
				if (entry != null && entries[folder][entry] != undefined)
					return entries[folder][entry];
				else if (entry != null && entries[folder][entry] == undefined &&
					entries[settings.default_language][entry] != undefined)
					return entries[settings.default_language][entry];
				else if (entry != null && entries[folder][entry] == undefined &&
					entries[settings.default_language][entry] == undefined)
					return null;
				return entries[folder];
			}
		}
		return entries;
	};

	this.command = function(file, category = null)
	{
		if (file == null && category != null)
			return this.root('commands/'+category+'/');
		else if (file != null &&category != null)
			return this.root('commands/'+category+'/'+file);
		else if (file != null && category == null)
			return Command.get(file);
		return null;
	};
};

module.exports = new Load();