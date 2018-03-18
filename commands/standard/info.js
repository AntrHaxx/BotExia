const Discord = require('discord.js');

module.exports = {
    name : "info",
    description : "Info relative à une commande precise",
    usage : "`*info <NomDeLaCommande>`",
    execute(message, args, client){
        const arg = message.content.split(/ +/);
        const command = arg[0];

        const embed = {
            "title": "Info",
            "color": 4886754,
           
            "footer": {
              "text": "Exia.cesi Promo St-Nazaire-2017"
            },
            "author": {
              "name": "Bot Exia v2.0",
            },
            "fields": [
              {
                "name" : "Nom",
                "value" : "Nom de la commande : " +client.commands.standard.name || client.commands.prosit.name
              },
              {
                "name": "Description",
                "value" :  ""+client.commands.standard.description || client.commands.prosit.description
              },
              {
                "name" : "Commande",
                "value" : ""+client.commands.standard.usage || client.command.prosit.usage
              },
            ]
          };
          
        if (!args.length) {
            message.channel.send('N\'oulis pas de mettre le nom de la commande');
        }
        else {
            if(!client.commands.standard.command || !client.commands.prosit.command){
                message.channel.send("Ce n\'est pas une commande valide")
            }
            else{
                message.channel.send({embed})
            }
    
        }
    }
}