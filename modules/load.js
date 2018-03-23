var Load = function()
{
	/*
	**	Merge Args
	**	Transforme un tableau d'erguments en chemin d'acces
	**
	**	@param	args 	[obk]	Tableau d'argiments
	**	@return			[str]	Chemin d'acces vers un dossier ou fichier
	*/
	var	_merge_args = function(args)
	{
		let arr = [];
		for (let arg in args)
			arr.push(args[arg]);
		return arr.join('/');
	};

	/*
	**	Is File
	**	Verifie si un chemin pointe vers un fichier
	**
	**	@param	path	[mixed]	Chemin d'acces a tester
	**	@return			[bool]	TRUE si le chemin pointe vers un fichier
	*/
	this.is_file = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		try {
			return fs.lstatSync('./'+path).isFile();
		} catch(e) {
			return false;
		};
	};

	/*
	**	Is Directory
	**	Verifie si un chemin pointe vers un dossier
	**
	**	@param	path	[mixed]	Chemin d'acces a tester
	**	@return			[bool]	TRUE si le chemin pointe vers un dossier
	*/
	this.is_directory = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		try {
			return fs.lstatSync('./'+path).isDirectory();
		} catch(e) {
			return false;
		};
	};

	/*
	**	Root
	**	Charge un dossier ou fichier a partir de la racine
	**
	**	@param	path	[str]	Chemin d'access a tester
	**	@return			[mixed]	Le contenu du fichier si un fichier es pointe
	**							Liste des fichiers/dossiers du dossier pointe
	**							null si chemin d'acces invalide
	*/
	this.root = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		try {
			if (this.is_file(path))
				var data = require("../"+path);
			else if (this.is_directory(path))
				var data = fs.readdirSync('./'+path);
			else
				var data = null;
		} catch(e) {
			if (global.Log != undefined)
				global.Log.error("Erreur de chargement du fichier "+path, e);
			else
				console.log("Erreur de chargement du fichier "+path+":\n"+e);
			return null;
		};
		return data;
	};

	/*
	**	Module
	**	Charge un dossier ou fichier a partir du sousdossier /modules
	**
	**	@param	path	[str]	Chemin d'access a tester
	**	@return			[mixed]	Le contenu du fichier si un fichier es pointe
	**							Liste des fichiers/dossiers du dossier pointe
	**							null si chemin d'acces invalide
	*/
	this.module = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		if (path.substr(-3, 3) != ".js")
			path += ".js";
		return this.root("modules/"+path);
	};

	/*
	**	Helper
	**	Charge un dossier ou fichier a partir du sousdossier /modules/helpers
	**
	**	@param	path	[str]	Chemin d'access a tester
	**	@return			[mixed]	Le contenu du fichier si un fichier es pointe
	**							Liste des fichiers/dossiers du dossier pointe
	**							null si chemin d'acces invalide
	*/
	this.helper = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		if (path.substr(-3, 3) != ".js")
			path += ".js";
		return this.module("helpers/"+path);
	};

	/*
	**	Json
	**	Charge un dossier ou fichier a partir du sousdossier /json
	**
	**	@param	path	[str]	Chemin d'access a tester
	**	@return			[mixed]	Le contenu du fichier si un fichier es pointe
	**							Liste des fichiers/dossiers du dossier pointe
	**							null si chemin d'acces invalide
	*/
	this.json = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		if (path.substr(-5, 5) != ".json")
			path += ".json";
		return this.root("json/"+path);
	};

	/*
	**	Help
	**	Charge un dossier ou fichier a partir du sousdossier /json/docs/commands
	**
	**	@param	path	[str]	Chemin d'access a tester
	**	@return			[mixed]	Le contenu du fichier si un fichier es pointe
	**							Liste des fichiers/dossiers du dossier pointe
	**							null si chemin d'acces invalide
	*/
	this.help = function(path)
	{
		if (arguments[1] != undefined)
			path = _merge_args(arguments);
		if (path.doc != undefined)
			return help.doc;
		return this.json("docs/commands/"+path);
	};

	/*
	**	Language
	**	Charge l'integralite des langues, une langue specifique ou une entree
	**
	**	@param	lng		[str]	Langue a charger
	**	@param	entry	[str]	Entree a chercher
	**	@return			[mixed]	Objet avec toutes les langues et leurs entrees
	**							Si lng est specifie: objet contenant les entrees de la langue
	**							Si lng et entry specifies: entree de la  langue.
	**								Si non trouve cherche dans la langue par defaut.
	**							null si rien n'est trouve
	*/
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

	/*
	**	Command
	**	Charge une commande ou la liste des commandes d'une categorie
	**
	**	@param	file 		[str]	Commanda a charger
	**	@param	category	[str]	Categorie de la commande
	**	@return				[mixed]	Objet de la commande si file est specifie
	**								Objet de la commande si file et category sont specifies
	**								Objet listant les commandes si file non specifie et category specifie
	**								null si commande ou categorie non trouves
	*/
	this.command = function(file, category = null)
	{
		if (file == null && category != null)
			return this.root('commands/'+category+'/');
		else if (file != null &&category != null)
		{
			file += file.substr(-3, 3) != ".js" ? ".js" : "";
			return this.root('commands/'+category+'/'+file);
		}
		else if (file != null && category == null)
			return Command.get(file);
		return null;
	};
};

module.exports = new Load();