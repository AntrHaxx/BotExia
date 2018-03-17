global.fs = require('fs');
global.Discord = require('discord.js');
global.client = new Discord.Client();
global.config = require('./json/config.json');
const Command = require('./helpers/command');

client.commands = Command.loadAll();

client.on('ready', () => {
	console.log('Pret a servir !');
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	try {
		for (category in client.commands)
		{
			command = client.commands[category].get(commandName);
			if (command != null)
				break;
		}
        //console.log(client.commands.list());
        if (command != null)
            command.execute(message, args, client);
	}
	catch (error) {	
		console.error(error);
    }
});

client.login(config.token);