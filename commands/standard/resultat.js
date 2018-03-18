var { mcdo, bk, ange, geant, enfer } = require('../../index.js');

module.exports = {
    name : "resultat",
    description : "Affiche le resultat du vote pour manger \n Channel Disponible pour l'affichage : \n - Debug \n - On_Mang_Ou",
    usage : "`*resultat <channel>`",
    execute(message, args)
    {
        const { bk, mcdo, ange, geant, enfer } = require('../../json/voteManger.json');

        const commands = message.content.split(/ +/);
        const resultat = commands[0];
        const info = args.length ? args.shift().toLowerCase() : null;

        var other = Client.channels.find('name', 'on-manj-ou');
        var debug = Client.channels.find('name', 'debug');

        if (!info.length) {
			message.channel.send('N\'oulie pas de mettre le channel');
		}
		else {
                if(info === 'debug'){ 
                    debug.send("**Les resultats sont**:\n\n McDo : " +mcdo + " \n Ange : " +ange + "\n Géant : " +geant + "\n Bk : " +bk + "\n Enfer : " +enfer + "\n FoodTruck : R.I.P à jamais dans nos coeurs");
                }
                else if (info === 'OnMangOu'){
                    other.send("@everyone \n \n **Les resultats sont**:\n\n McDo : " +mcdo + " \n Ange : " +ange + "\n Géant : " +geant + "\n Bk : " +bk + "\n Enfer : " +enfer + "\n FoodTruck : R.I.P à jamais dans nos coeurs");
                }
                else if (info === 'console'){ 
                    console.log('McDo : ' +mcdo);
                }
                else {
                    message.channel.send('Resultat : ' +args)
                }
            }
        }
    };