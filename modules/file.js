var File = function()
{
	this.is_file = function(path)
	{
		return Load.is_file(path);
	};

	this.read = function(path, callback = null)
	{
		if (callback == null)
		{
			if (Load.is_file(path))
				return Load.root(path);
			else
				Log.error("Le chamin "+path+" ne pointe pas vers un fichier valide.");
		}
		fs.readFile('./'+path, 'utf8', callback);
	};

	this.write = function(path, data, callback = null)
	{
		if (callback == null)
			callback = function (){};
		if (typeof data == "object")
			data = JSON.stringify(data);
		fs.writeFile("./"+path, data, 'utf8', callback);
	};
};

module.exports = new File();