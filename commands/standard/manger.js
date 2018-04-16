module.exports = { 
    name : "manger",
    description : "G FAIM",
    usage :"`*manger`",
    permissions: {
        "*": "*"
    },
    execute(message, args, client){
        var other = client.channels.find('name', '🍔manger-au-̶b̶k̶-̶');
        other.send('@everyone  \n\n▒█▀▀▀█ █▀▀▄ 　 █▀▄▀█ █▀▀█ █▀▀▄ █▀▀▀ █▀▀ 　 █▀▀█ █░░█ 　 ▀█'+ 
                                '\n▒█░░▒█ █░░█ 　 █░▀░█ █▄▄█ █░░█ █░▀█ █▀▀ 　 █░░█ █░░█ 　 █▀'+
                                '\n▒█▄▄▄█ ▀░░▀ 　 ▀░░░▀ ▀░░▀ ▀░░▀ ▀▀▀▀ ▀▀▀ 　 ▀▀▀▀ ░▀▀▀ 　 ▄░');

        const commands = message.content.split(/ +/);
        const command = commands[0];
        const manger = args.length ? args[0].toLowerCase() : null;

        var results = require('../../json/voteManger.json');
        results['bk'] = 0;
        results['mcdo'] = 0;
        results['ange'] = 0;
        results['geant'] = 0;
        results['enfer'] =0;
        
        results = JSON.stringify(results);
        var fs = require('fs');
        fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data){
            message.reply('Les Valeures ont bien été reset');
        });
    }
};
