var Command = function()
{
	var _commands = {};

	/*
	**	Has Role
	**	Verifie que l'utilisateur dispose de certains droits sur une commande
	**
	**	@param	message	[obj]	Objet message genere par Discord
	**	@param	croles	[obj]	Permissions de la commande
	**	@return 		[bool]	TRUE si l'utilisateur dispose de droits
	**								sur la commande, sinon FALSE
	*/
	var _has_role = function(croles)
	{
		if (message == undefined || message == null)
			return true;
		let is = false;
		let uroles = client.guilds.get(config.server_id).members.get(message.author.id).roles;
		uroles.forEach(function(role, id) {
			if (croles.includes(role.name))
				is = true;
			else if (croles.includes(role.name.toLowerCase()))
				is = true;
		});
		return is;
	};

	/*
	**	Has
	**	Verifie l'existence d'une commande
	**
	**	@param	search	[str]	Commande a chercher
	**	@return 		[bool]	TRUE si commande trouve, sinon FALSE
	*/
	this.has = function (search)
	{
	    for (category in _commands)
	    {
	        for (command in _commands[category])
	        {
	        	let command = _commands[category][command]
	        	if (command.name == search ||
	        		(command.alias != undefined && command.alias.includes(search)))
	        		return true;
	        }
	    }
	    return false;
	};

	/*
	**	Call
	**	Execute une commande
	**
	**	@param	search	[str]	Commande a chercher
	**	@return 		[int]	Etat de la commande
	*/
	this.call = function (search, args = null)
	{
		let command = this.get(search);
		if (command == null)
			return 2;
		if (!this.is_allowed(command))
			return 3;
		if (typeof args == "string")
			args = args.split(/ +/);
		//try {
			return command.execute(message, args, client);
		/*} catch(e) {
			console.log(new Error());
			Log.error("Erreur d'execution de la commande "+search, e);
		}*/
	};

	/*
	**	Get
	**	Retourne une commande
	**
	**	@param	search	[str]	Commande a chercher
	**	@return 		[mixed]	Objet contenant la commande
	**							null si commande non trouvee
	*/
	this.get = function (search)
	{
	    for (category in _commands)
	    {
	        for (command in _commands[category])
	        {
	        	command = _commands[category][command];
	        	if (command.name == search ||
	        		(command.alias != undefined && command.alias.includes(search)))
	        	{
	        		return command;
	        	}
	        }
	    }
	    return null;
	};

	/*
	**	Category
	**	Retourne les commandes d'une categorie
	**
	**	@param	search	[str]	Commande a chercher
	**	@return 		[mixed]	Objet contenant la commande
	**							null si commande non trouvee
	*/
	this.category = function (search)
	{
	    for (category in _commands)
	    {
	        if (category == search)
	        	return _commands[category];
	    }
	    return null;
	};

	/*
	**	List
	**	Retourne la liste des commandes
	**
	**	@param	category 	[str]	Nom de la categorie a lire
	**	#param	array 		[bool]	TRUE retourne la liste des noms de commandes
	**	@return 			[mixed]	Si category vaut null, retpurne toutes les 
	**									commandes dans leurs categories respectives.
	**								Si category est defini retourne les commandes
	**									de la categorie
	**								Si category defini et invalide, retourne null
	*/
	this.list = function(category = null, array = false)
	{
		if (category != null && _commands[category] != undefined)
		{
			if (array == false)
				return _commands[category];
			let list = [];
			for (let command in _commands[category])
				list.push(command);
			return list;
		}
		else if (category == null)
		{
			if (array == false)
				return _commands;
			let list = {};
			for (category in _commands)
			{
				list[category] = [];
				for (let command in _commands[category])
				{
					list[category].push(_commands[category][command].name);
				}
			}
			return list;
		}
		return null;
	};

	/*
	**	Help
	**	Retourne la documentation d'une commande
	**
	**	@param	search	[str]	Nom de la commande a chercher
	**	@return 		[mixed]	Objet contenant la documentation
	**							undefined si documentation inexistante
	**							null si commande non trouvee
	*/
	this.help = function (search)
	{
	    for (category in _commands)
	    {
	        for (command in _commands[category])
	        {
	        	let name = _commands[category][command].name
	        	if (result == null && name == search)
	        	{
	        		return _commands[category][command].doc;
	        	}
	        }
	    }
	    return null;
	};

	/*
	**	Is Allowed
	**	Verifie qu'un utilisateur a le droit d'executer une commande
	**
	**	@param	message[obj]
	**	@param	command[mixed]	Le nom d'une commande
	**							Un objet contenant une commande
	**	@return [bool]
	*/
	this.is_allowed = function (command)
	{
		if (typeof command == "string")
			command = this.get(command);
		if (command == undefined || command == null)
			return false;
		if (message == undefined || message == null)
			return true;
		let all = false;
		for (type in command.permissions)
		{
			let perm = command.permissions[type];
			if (type == message.channel.type)
				return (perm == "*" || _has_role(perm)) ? true : false;
			else if (type == "*" && (perm == "*" || _has_role(perm)))
				all = true;
		}
		return all;
	};

	/*
	**	Load
	**	Charge les commandes
	**
	**	@param	[void]
	**	@return [void]
	*/
	this.load = function()
	{
		let categories = Load.root('commands');
		for (category of categories)
		{
			const files = Load.command(null, category);	
			if (files != null && files.length)
				_commands[category] = {};
			for (file of files)
			{
				if (Load.is_file('commands', category, file))
				{
		    		let command = Load.command(file, category);
		    		command.doc = Load.help(category, file+'on');
		    		_commands[category][command.name] = command;
				}
			}
		}
	};

	this.load();
}

module.exports = new Command();