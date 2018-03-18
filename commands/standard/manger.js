module.exports = { 
    name : "manger",
    description : "G FAIM",
    usage :"`*manger`",
    execute(message, args, client){
        var other = global.client.channels.find('name', 'on-manj-ou');
        other.send('@everyone ON MANG OU ?');

        const commands = message.content.split(/ +/);
        const command = commands[0];
        const manger = args.length ? args[0].toLowerCase() : null;

        var results = require('../../json/voteManger.json');
        results['bk' && 'ange' && 'mcdo' && 'geant' && 'enfer'] =0;
        
        results = JSON.stringify(results);
        var fs = require('fs');
        fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data){
            message.reply('Les Valeures ont bien été reset');
        });
    }
};
