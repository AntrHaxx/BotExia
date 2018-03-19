global.fs = require('fs');
global.Discord = require('discord.js');
global.client = new Discord.Client();
global.Msg = require('./helpers/msg');
global.Log = require('./helpers/log');
global.config;
const Command = require('./helpers/command');
global.Command = Command;

try {
    config = require('./json/config.json');
}
catch (e) {
    return Log.error("Creez le fichier de configuration", "json/config.json");
}

client.commands = Command.loadAll();

client.on('ready', () => {
    Log.success("Pret a servir !");
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	Msg.set(message);

	try {
		for (category in client.commands)
		{
			command = client.commands[category].get(commandName);
			if (command != null)
				break;
		}
        //console.log(client.commands.list());
        if (command != null)
            if (Command.is_allowed(message, command))
                command.execute(message, args, client);
            else
                Msg.error("Vous n'etes pas autorise a utiliser cette commande.");
	}
	catch (error) {	
		console.error(error);
    }
});

//--------------------------------------Vote reaction--------------------------------------


client.on('messageReactionAdd', (reaction, message, args, client) =>
{

	var results = require('./json/voteManger.json');
	switch (reaction.emoji.id)
    {
    	//McDo
    	case '372677821543219210':
        	console.log("Vote pour aller manger a McDo ");
        	results['mcdo']++;
    	break;
        //Ange     
        case '388631405778698242':
        	console.log('Vote pour aller manger a Ange ');
        	results['ange']++;
        break;
        //Geant
        case '388631582124146689':
            console.log("Vote pour aller chercher de la bouffe a Geant ");
            results['geant']++;
        break;
        //Buger King 
        case '388631666605686784' :
            console.log("Vote pour aller manger Au Burger King ");
            results['bk']++;
        break;
        //Enfer (RU)
        case '388631620002906112':
            console.log("Vote pour aller manger en Enfer ");
			results['enfer']++;
        break;    
	}
	results = JSON.stringify(results);
	fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data){
	console.log("Vote ecris dans voteManger.json");
	});
});

//--------------------------------------Vote reaction (enleve 1 a la variable quand la reaction est enlevé)--------------------------------------

client.on('messageReactionRemove', (reaction, member) =>
{
    switch (reaction.emoji.id)
    {
    //McDo
    case '372677821543219210':
        console.log("- 1 Vote pour aller manger a McDo ");
        results['mcdo']--;
    break;
    //Ange     
    case '388631405778698242':
        console.log('-1 Vote pour aller manger a Ange ');
        results['ange']--;
    break;
    //Geant
    case '388631582124146689':
        console.log("-1 Vote pour aller chercher de la bouffe a Geant ");
        results['geant']--;
    break;
    //Buger King 
    case '388631666605686784' :
        console.log("-1 Vote pour aller manger Au Burger King ");
        results['bk']--;
    break;
    //Enfer (RU)
    case '388631620002906112':
        console.log("-1 Vote pour aller manger en Enfer ");
		results['enfer']--;
	break;
	}
	results = JSON.stringify(results);
	fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data){
		console.log('Vote enregistre');
	});
});


client.login(config.token);