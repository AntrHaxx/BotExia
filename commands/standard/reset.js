module.exports = {
    name : "reset",
    description : "Permet de reset les votes pour manger ",
    usage : "`*reset <Lieux>`",
    alias: ["vm", "voteGraille"],
    permissions: {
        "*": "*"
    },
    execute(message, args, client)
    {
        var results = require('../../json/voteManger.json');
        var fs = require('fs');

            results['bk'] = 0;
            results['mcdo'] = 0;
            results['ange'] = 0;
            results['geant'] = 0;
            results['enfer'] =0;
            results = JSON.stringify(results);
            fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data){
                message.reply('Vote enregistre');
            });
    }
}
