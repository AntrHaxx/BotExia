module.exports = {
    name : "voteManger",
    description : "Permet de voter pour manger ",
    usage : "`*voteManger <Lieux>`",
    alias: ["vm", "voteGraille"],
    execute(message, args, client)
    {
        const commands = message.content.split(/ +/);
        const command = commands[0];
        const manger = args.length ? args[0].toLowerCase() : null;

        if (!args.length) {
			message.channel.send('N\'oulie pas de mette le lieux');
		}
		else {
            var results = require('../../json/voteManger.json');
            if (results[manger] == undefined) {
				return message.reply('**'+manger+'** n\'est pas un lieux valide ' +manger);
			}
            else{
                if (args[0] == 'reset'){
                    results['bk']=0;
                    results['mcdo']=0;
                    results['ange']=0;
                    results['geant']=0;
                    results['enfer']=0;
                    results['reset']=0;
                }
                var fs = require('fs');
                results[manger]++;
                results = JSON.stringify(results);
                fs.writeFile('./json/voteManger.json', results, 'utf8', function readFileCallback(err, data){
                    message.reply('Vote enregistre');
                });
               
            }
        }
    }
};

//test : 400623778037628941
//debug : 400651374146355210