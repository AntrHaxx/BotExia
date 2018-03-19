module.exports = {
    name : "prosit",
    description : "Permet de changer de prosit",
    usage : "`*prosit <N°DuPrsoit>`",
    alias: ["pr", "NumeroProsit"],
    permissions: {
        "*": "*"
    },
    execute(message, args, client)
    {
        const commands = message.content.split(/ +/);
        const command = commands[0];
        const num = args.length ? args[0].toLowerCase() : null;

        if (!args.length) {
			message.channel.send('N\'oulie pas de mette le lieux');
		}
		else {
            var numero = require('../../json/prosit.json');
            if (isNaN(num)) {
				return message.reply("Faut rentrer un numero gros");
			}
            else{
                var fs = require('fs');
                numero['pro'] = num;
                numero = JSON.stringify(numero);
                fs.writeFile('./json/prosit.json', numero, 'utf8', function readFileCallback(err, data){
                    message.reply('On passe au prosit n°'+num);
                });
               
            }
        }
    }
};