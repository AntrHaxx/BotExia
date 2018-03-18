global.fs = require('fs');
global.Discord = require('discord.js');
global.Client = new Discord.Client();
global.Config = require('./json/config.json');
global.Msg = require('./helpers/msg');
const Command = require('./helpers/command');

Client.commands = Command.loadAll();

Client.on('ready', () => {
	console.log('Pret a servir !');
});

Client.on('message', message => {
    if (!message.content.startsWith(Config.prefix) || message.author.bot) return;

	const args = message.content.slice(Config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	Msg.set(message);

	try {
		for (category in Client.commands)
		{
			command = Client.commands[category].get(commandName);
			if (command != null)
				break;
		}
        //console.log(client.commands.list());
        if (command != null)
        {
        	if (command.type == undefined || command.type.includes(message.channel.type))
            	command.execute(message, args, Client);
            else
            	Msg.error("Cette commande n'est pas permise dans ce type de channel.");
		}
	}
	catch (error) {	
		console.error(error);
    }
});

Client.login(Config.token);