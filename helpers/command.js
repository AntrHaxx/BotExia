module.exports.Category = function(category, name = null)
{
	var _category = category;

	this.name = name == null ? category : name;

	var _commands = null;

	var _commands_names = [];

	this.from_name = function(name)
	{
		if (_commands.has(name))
			return _commands.get(name);
		return null;
	}

	this.from_alias = function(name)
	{
		let data = null;
		_commands.forEach(function(value, key, collection){
			if (value.alias != undefined && value.alias.includes(name))
				data = value;
		});
		return data;
	}

	this.get = function(name)
	{
		let data = this.from_name(name);
		if (data == null)
			data = this.from_alias(name);
		return data;
	};

	this.list = function(full = false)
	{
		if (full)
			return _commands;
		else
			return _commands_names;
	};

	this.set = function(category = null)
	{
		if (category != null)
			_category = category;
		if (_category == null || !global.fs.existsSync('./commands/'+_category))
			return 0;

		const files = fs.readdirSync('./commands/'+_category);
		_commands = new global.Discord.Collection();

		for (const file of files) {
			if (fs.lstatSync('./commands/'+_category+'/' +file).isFile())
			{
		    	let command = require('../commands/'+_category+'/' +file);
				command.doc = require('../json/docs/commands/'+_category+'/' +file+'on');
		    	_commands.set(command.name, command);
		    	_commands_names.push(command.name);
			}
		}
		return 0;
	};

	this.set();
};

module.exports.loadAll = function(data = [])
{
	var categories = global.fs.readdirSync('./commands');
	var commands = {};
	for (cat of categories)
	{
		const files = fs.readdirSync('./commands/'+cat);
		if (files.length && (!data.length || data.contains(cat)))
			commands[cat] = new module.exports.Category(cat);
	}
	return commands;
}