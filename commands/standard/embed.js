exports = {
    name : "test",
    description : "Envois un msg embed",
    usage : "`*test`",
    execute(message, client){
        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Donc voila un message styler",
            url: "http://google.com",
            description: "Ceci est un test de message embed pour te montrer a quel pouint c'est styler sa race ",
            fields: [{
                name: "Fields",
                value: "On peut avoir différents champs avec des titre"
              },
              {
                name: "Masked links",
                value: "Tu peux mettre des liens [masked links](http://google.com) comme sa "
              },
              {
                name: "Markdown",
                value: "Et tu peux utiliser les **__Markdown__** *dedans*."
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Exemple"
            }
          }
        });
    },
}