var { mcdo, bk, ange, geant, enfer } = require('../../index.js');

module.exports = {
    name : "resultat",
    description : "Affiche le resultat du vote pour manger \n Channel Disponible pour l'affichage : \n - Debug \n - On_Mang_Ou",
    usage : "`*resultat <channel>`",
    permissions: {
        "*": "*"
    },
    execute(message, args)
    {
        const { bk, mcdo, ange, geant, enfer } = require('../../json/voteManger.json');

        const commands = message.content.split(/ +/);
        const resultat = commands[0];
        const info = args.length ? args.shift().toLowerCase() : null;

        const embed = {
            "title": "Resultat",
            "color": '004346',
            "description" :"Voici les resultat du vote",
      
            "footer": {
              "text": "Exia.cesi | Promo St-Nazaire-2017"
            },
            "author": {
              "name": "Bot Exia v2.0",
              "icon_url" : "https://cdn.discordapp.com/attachments/400651374146355210/425232194773057536/color4.jpg"
            },
            "fields": [
              {
                "name" : "McDo",
                "value" : "Nombre de vote pour McDo : " +mcdo
              },
              {
                "name": "Bk",
                "value" :  "Nombre de vote pour bk : "+bk
              },
              {
                "name": "Ange",
                "value" :  "Nombre de vote pour ange : "+ange
              },
              {
                "name": "Geant",
                "value" :  "Nombre de vote pour geant : "+geant
              },
              {
                "name": "RU",
                "value" :  "Nombre de vote pour le Ru : "+enfer
              },
              {
                  "name": "FoodTruck",
                  "value": "R.I.P à jamais dans nos coeurs"
              }
            ]
          };

        const embedManger = {
            "title": "Resultat",
            "color": '004346',
            "description" :"@everyone Voici les resultat du vote",
      
            "footer": {
              "text": "Exia.cesi | Promo St-Nazaire-2017"
            },
            "author": {
              "name": "Bot Exia v2.0",
              "icon_url" : "https://cdn.discordapp.com/attachments/400651374146355210/425232194773057536/color4.jpg"
            },
            "fields": [
              {
                "name" : "McDo",
                "value" : "Nombre de vote pour McDo : " +mcdo
              },
              {
                "name": "Bk",
                "value" :  "Nombre de vote pour bk : "+bk
              },
              {
                "name": "Ange",
                "value" :  "Nombre de vote pour ange : "+ange
              },
              {
                "name": "Geant",
                "value" :  "Nombre de vote pour geant : "+bk
              },
              {
                "name": "RU",
                "value" :  "Nombre de vote pour le Ru : "+enfer
              },
              {
                  "name": "FoodTruck",
                  "value": "R.I.P à jamais dans nos coeurs"
              }
            ]
          };

        var other = client.channels.find('name', '🍔manger-au-̶b̶k̶-̶');
        var debug = client.channels.find('name', 'debug');

        if (!info.length) {
			message.channel.send('N\'oulie pas de mettre le channel');
		}
		else {
                if(info === 'debug'){ 
                    debug.send({embed});
                }
                else if (info === 'manger'){
                    other.send({embed});
                }
                else if (info === 'console'){ 
                    console.log('McDo : ' +mcdo);
                }
                else {
                    message.channel.send({embed})
                }
            }
        }
    };