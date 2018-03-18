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