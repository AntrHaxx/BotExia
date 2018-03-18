module.exports = {
  name : "info",
  description : "Info relative à une commande precise",
  usage : "`*info <NomDeLaCommande>`",
  execute(message, args, client){
    if (!args.length)
      return Msg.error('N\'oulis pas de mettre le nom de la commande');
    let command = null;
    for (category in client.commands)
    {
        if (command == null)
            command = client.commands[category].get(args[0]);
        else
            break;
    }
    if (command == null)
      return Msg.error("Ce n\'est pas une commande valide");
    Msg.format({
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
          "value" : command.name
        },
        {
          "name": "Description",
          "value" :  ""+command.description
        },
        {
          "name" : "Commande",
          "value" : ""+command.usage
        }
      ]
    });
  }
}