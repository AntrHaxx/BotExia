global.fs = require('fs');
global.Discord = require('discord.js');
global.client = new Discord.Client();
global.Msg = require('./helpers/msg');
global.Log = require('./helpers/log');
global.config;
global.Command = require('./helpers/command');

try {
    config = require('./json/config.json');
}
catch (e) {
    return Log.error("Creez le fichier de configuration", "json/config.json");
}

client.login(config.token);

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	Msg.set(message);

	try {
        if (!Command.call(commandName, message, args))
            Msg.error("Vous n'etes pas autorise a utiliser cette commande.");
	}
	catch (error) {	
		Log.error(error, "index.js:onMessage");
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
        	Log.info("Vote pour aller manger a McDo ");
        	results['mcdo']++;
    	break;
        //Ange     
        case '388631405778698242':
        	Log.info('Vote pour aller manger a Ange ');
        	results['ange']++;
        break;
        //Geant
        case '388631582124146689':
            Log.info("Vote pour aller chercher de la bouffe a Geant ");
            results['geant']++;
        break;
        //Buger King 
        case '388631666605686784' :
            Log.info("Vote pour aller manger Au Burger King ");
            results['bk']++;
        break;
        //Enfer (RU)
        case '388631620002906112':
            Log.info("Vote pour aller manger en Enfer ");
			results['enfer']++;
        break;    
	}
	results = JSON.stringify(results);
	fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data){
	Log.success("Vote ecris dans voteManger.json");
	});
});

//--------------------------------------Vote reaction (enleve 1 a la variable quand la reaction est enlevé)--------------------------------------

client.on('messageReactionRemove', (reaction, member) =>
{
    switch (reaction.emoji.id)
    {
    //McDo
    case '372677821543219210':
        Log.info("- 1 Vote pour aller manger a McDo ");
        results['mcdo']--;
    break;
    //Ange     
    case '388631405778698242':
        Log.info('-1 Vote pour aller manger a Ange ');
        results['ange']--;
    break;
    //Geant
    case '388631582124146689':
        Log.info("-1 Vote pour aller chercher de la bouffe a Geant ");
        results['geant']--;
    break;
    //Buger King 
    case '388631666605686784' :
        Log.info("-1 Vote pour aller manger Au Burger King ");
        results['bk']--;
    break;
    //Enfer (RU)
    case '388631620002906112':
        Log.info("-1 Vote pour aller manger en Enfer ");
		results['enfer']--;
	break;
	}
	results = JSON.stringify(results);
	fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data){
		Log.success('Vote enregistre');
	});
});

client.on('ready', () => {
    Log.success("Pret a servir !", client.readyAt);
});

client.on('warn', () => {
    Log.warning("Reconnection en cours");
});

client.on('error', () => {
    Log.error("Reconnection en cours");
});

client.on('reconnecting', () => {
    Log.info("Reconnection en cours");
});

client.on('disconnect', () => {
    Log.info("Ca a coupe !");
});