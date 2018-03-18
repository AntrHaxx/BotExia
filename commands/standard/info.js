module.exports = {
  name : "info",
  description : "Info relative à une commande precise",
  usage : "`*info <NomDeLaCommande>`",
  execute(message, args, client){
    if (!args.length)
      return Msg.error('N\'oulies pas de mettre le nom de la commande');
    else if(!client.commands.list().includes(args))
      return Msg.error("Ce n\'est pas une commande valide");

      return Msg.format({
        "title": "Info",
        "color": "info",

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
          }
        ]
      });
    }
}