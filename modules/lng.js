var Lng = function()
{
	// Contient les entrees de traduction
	var _entries = {};

	// Langue par defaut utilisee pour la recherche
	var _default = config.default_language;

	/*
	**	Get
	**	Recupere la valeur d'une entree
	**	Possibilite de changer de langue a la volee en indiquant
	**	le deuxieme parametre. Si non valide, la langue par
	**	defaut sera utilisee.
	**
	**	@param	entry	[str]	Cle de l'entree a recuperer
	**	@param	lng 	[str]	Langue dans laquelle charger
	**								langue par defaut si null
	**	@return			[str]	Chaine trouvee ou chaine vide.
	*/
	this.get = function(entry, lng = null)
	{
		if (lng == null)
			lng = _default;
		else if (_entries[lng] == undefined ||
			_entries[lng][entry] == undefined)
			lng = _default;
		if (_entries[lng][entry] != undefined)
			return _entries[lng][entry];
		else
			return "";
	};

	/*
	**	Parse
	**	Detecte le mot cle lng dans une chaine et traduit s'il le trouve
	**	Usage de base
	**	str = "lng:chaine a traduire"
	**	Possibilite de changer de langue a la volee avec la combinaison:
	**	str = "lng:langue:chaine a traduire"
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
			if (str[0] != undefined && _entries[str[0]] != undefined)
			{
				lng = str[0];
				str = str.slice(1);
			}
			else
				lng = _default;
			return this.get(str.join(':'), lng);
		}
		return str.join(':');
	};

	/*
	**	Set
	**	Definit une langue par defaut
	**
	**	@param	ng 	[str]	Langue a definir par defaut
	**	@return 	[bool]	TRUE si langue valide, sinon FALSE
	*/
	this.set = function(lng)
	{
		if (_entries[lng] != undefined)
		{
			_default = lng;
			return true;
		}
		return false;
	};

	/*
	**	Load
	**	Charge les entrees des langues ou d'une langue specifique
	**
	**	#param	lng [str]	Langue a charger
	**				[bool]	TRUE si langie charger, sinon FALSE
	*/
	this.load = function(lng = null)
	{
		let data = Load.language(lng);
		if (data != null)
		{
			if (lng == null)
				_entries = data;
			else
				_entries[lng] = data;
			return true;
		}
		return false;
	};

	this.load();
}

module.exports = new Lng();