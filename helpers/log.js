const colors = require('colors');

var Log = function ()
{
	this.info = function (msg, append = "")
	{
		this.format("log", "  ".bgBlue.underline.strikethrough+(" "+msg+" ").bgWhite.black+(" "+append+" ").bgWhite.black.bold.inverse);
	};

	this.success = function (msg, append = "")
	{
		this.format("log", "  ".bgGreen.underline.strikethrough+(" "+msg+" ").bgWhite.black+(" "+append+" ").bgWhite.black.bold.inverse);
	};

	this.warning = function (msg, append = "")
	{
		this.format("log", "  ".bgYellow.underline.strikethrough+(" "+msg+" ").bgWhite.black+(" "+append+" ").bgWhite.black.bold.inverse);
	};

	this.error = function (msg, append = "")
	{
		this.format("error", "  ".bgRed.underline.strikethrough+(" "+msg+" ").bgWhite.black+(" "+append+" ").bgWhite.black.bold.inverse);
	};

	this.format = function (type = "log", format)
	{
		if (type == "log")
			console.log(format);
		else if (type == "error")
			console.error(format);
	}
};
module.exports = new Log();