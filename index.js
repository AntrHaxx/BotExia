global.config;
global.message;
global.message = null;
try {
    config = require('./json/config.json');
}
catch (e) {
    return console.log("Creez le fichier de configuration: json/config.json");
}
global.fs = require('fs');
global.Discord = require('discord.js');
global.client = new Discord.Client();
global.Load = require("./modules/load");
global.Lng = Load.module("lng");
global.Log = Load.module("log");
global.Msg = Load.module("msg");
global.File = Load.module("file");
global.Command = Load.module("command");

client.on('message', message => {
    if (!config.accept_all_instances && config.instance_owner != message.author.id)
        return;
    if (typeof config.prefix == "string" && !message.content.startsWith(config.prefix))
        return;
    else
        var prefix = config.prefix;
    if (typeof config.prefix == "object" && config.prefix != null) {
        let kill = true;
        for (pfx of config.prefix) {
            if (message.content.startsWith(pfx)) {
                var prefix = pfx;
                kill = false;
                break;
            }
        }
        if (kill)
            return;
    }

    global.message = message;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();


    let res = Command.call(commandName, args);
    if (res == 3)
        Msg.error("lng:denied permission");
    else if (res == 2)
        Msg.error("Commande \"" + commandName + "\" non trouvee");

});

//--------------------------------------Vote reaction--------------------------------------


client.on('messageReactionAdd', (reaction, message, args, client) => {
    var results = require('./json/voteManger.json');
    switch (reaction.emoji.id) {
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
        case '904b7c9326d7282cce83957ae55fe61a':
            Log.info("Vote pour manger chez lui");
            results['maison']++;
            break;
    }
    results = JSON.stringify(results);
    fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data) {
        Log.success("Vote ecris dans voteManger.json");
    });
});

//--------------------------------------Vote reaction (enleve 1 a la variable quand la reaction est enlevé)--------------------------------------

client.on('messageReactionRemove', (reaction, member) => {
    var results = require('./json/voteManger.json');
    switch (reaction.emoji.id) {
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
        case '904b7c9326d7282cce83957ae55fe61a':
            Log.info("-1 Vote pour manger chez lui");
            results['maison']--;
            break;
    }
    results = JSON.stringify(results);
    fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data) {
        Log.success('Vote enregistre');
    });
});

client.on('ready', () => {
    try {
     client.users.get(config.instance_owner).send("*cron init");
    }
    catch (e) {
        return Log.warning("Valid property \"instance_owner\" must be given in", "json/config.json");
    }
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

client.login(config.token);
