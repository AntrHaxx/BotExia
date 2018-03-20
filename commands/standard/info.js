module.exports = {
  name : "info",
<<<<<<< HEAD
=======
  description : "Info relative à une commande precise",
  usage : "`*info <NomDeLaCommande>`",
>>>>>>> 73f1709f4878adf226711b9ef6d21f6f29e05b81
  permissions: {
    "*": "*"
  },
  execute(message, args, client){
    if (!args.length)
      return Msg.error('N\'oulis pas de mettre le nom de la commande');
<<<<<<< HEAD
    let command = Command.call(args);
=======
    let command = Command.get(args);
>>>>>>> 73f1709f4878adf226711b9ef6d21f6f29e05b81
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