module.exports = {
  name : "info",
  permissions: {
    "*": "*"
  },
  execute(message, args, client){
    if (!args.length)
      return Msg.error('N\'oulis pas de mettre le nom de la commande');
    let command = Command.get(args);
    if (command == null)
      return Msg.error("Ce n\'est pas une commande valide");
    Msg.format({
      "title": "Info",
      "description": "Vocici les information à propos de la commande "+command.name,
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