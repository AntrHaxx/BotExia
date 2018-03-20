const colors = require('colors');

var Log = function ()
{
	/*
	**	Info
	**	Affiche un message dans la console avec la mise en forme INFO
	**
	**	@param	msg 	[str]	Texte principal du message
	**	@param	append	[str]	Texte secondaire du message
	**	@return 		[voi]
	*/
	this.info = function (msg, append = "")
	{
		msg = Lng.parse(msg);
		append = Lng.parse(append);
		this.format("log", "  ".bgBlue.underline.strikethrough+(" "+msg+" ").bgWhite.black+(" "+append+" ").bgWhite.black.bold.inverse);
	};

	/*
	**	Info
	**	Affiche un message dans la console avec la mise en forme SUCCESS
	**
	**	@param	msg 	[str]	Texte principal du message
	**	@param	append	[str]	Texte secondaire du message
	**	@return 		[voi]
	*/
	this.success = function (msg, append = "")
	{
		msg = Lng.parse(msg);
		append = Lng.parse(append);
		this.format("log", "  ".bgGreen.underline.strikethrough+(" "+msg+" ").bgWhite.black+(" "+append+" ").bgWhite.black.bold.inverse);
	};

	/*
	**	Info
	**	Affiche un message dans la console avec la mise en forme WARNING
	**
	**	@param	msg 	[str]	Texte principal du message
	**	@param	append	[str]	Texte secondaire du message
	**	@return 		[voi]
	*/
	this.warning = function (msg, append = "")
	{
		msg = Lng.parse(msg);
		append = Lng.parse(append);
		this.format("log", "  ".bgYellow.underline.strikethrough+(" "+msg+" ").bgWhite.black+(" "+append+" ").bgWhite.black.bold.inverse);
	};

	/*
	**	Info
	**	Affiche un message dans la console avec la mise en forme ERROR
	**
	**	@param	msg 	[str]	Texte principal du message
	**	@param	append	[str]	Texte secondaire du message
	**	@return 		[voi]
	*/
	this.error = function (msg, append = "")
	{
		msg = Lng.parse(msg);
		append = Lng.parse(append);
		this.format("error", "  ".bgRed.underline.strikethrough+(" "+msg+" ").bgWhite.black+(" "+append+" ").bgWhite.black.bold.inverse);
	};

	/*
	**	Info
	**	Affiche un message dans la console avec la mise en forme INFO
	**
	**	@param	type 	[str]	Type de log a appeler (log/error)
	**	@param	format	[str]	Texte formate a afficher
	**	@return 		[voi]
	*/
	this.format = function (type = "log", format)
	{
		if (type == "log")
			console.log(format);
		else if (type == "error")
			console.error(format);
	}
};
module.exports = new Log();