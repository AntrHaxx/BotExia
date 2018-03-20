var Load = function()
{
	this.base = function(path)
	{
		try {
			var data = require("../"+path);
		} catch(e) {
			if (Log != undefined)
				Log.error("Erreur de chargement du fichier "+path, e);
			else
				console.log("Erreur de chargement du fichier "+path+":\n"+e);
			return null;
		};
		return data;
	};

	this.module = function(path)
	{
		return this.base("modules/"+path);
	};

	this.helper = function(path)
	{
		return this.module("helpers/"+path);
	};

	this.json = function(path)
	{
		return this.base("json/"+path+".json");
	};

	this.help = function(path)
	{
		return this.json("docs/path/"+json);
	};

	this.command = function(path)
	{
		return Command.get(path);
	};
};

module.exports = new Load();