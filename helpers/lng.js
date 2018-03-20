var Lng = function()
{
	// Contient les entrees de traduction
	var _entries = {};

	/*
	**	Get
	**	Recupere la valeur d'une entree
	**
	**	@param	entry	[str]	Cle de l'entree a recuperer
	**	@return			[str]	Chaine trouvee ou chaine vide.
	*/
	this.get = function(entry)
	{
		if (_entries[entry] != undefined)
			return _entries[entry];
		else
			return "";
	};

	/*
	**	Parse
	**	Detecte le mot cle lng dans une chaine et traduit s'il le trouve
	**
	**	@param	str [str]	Chaine a tester
	**	@return		[str]	Chaine traduite ou tel qu'elle si lng non trouve.
	*/
	this.parse = function(str = "")
	{
		if (typeof str == "string" && str != "")
			str = str.split(':');
		else
			return str;
		if (str[0] == "lng")
		{
			str = str.slice(1);
			return this.get(str.join(':'));
		}
		return str.join(':');
	}

	/*
	**	Load
	**	Charge les entrees d'une langue specifique
	**
	**	#param	lng [str]	Langue a charger
	**				[void]
	*/
	this.load = function(lng = "fr")
	{
		try {
			var files = fs.readdirSync('./json/languages/'+lng+"/");
		} catch (e) {
			Log.error("Impossible de charger la langue "+lng, e);
		}
		for (file in files)
		{
			let json = require("../json/languages/"+lng+"/"+files[file]);
			for (entry in json)
			{
				_entries[entry] = json[entry];
			}
		}
	};

	this.load();
}

module.exports = new Lng();