module.exports = {
    name : 'help',
    execute(message, args, client){
        if (!args.length) {
            // Recuperer la liste des commandes
            let data = this.get_commands_list(client.commands);
            // Afficher la liste des commandes
            let fields = [];
            for (category in data)
                fields.push({name: data[category].name, value: data[category].commands});
            Msg.format({
                color: 3447003,
                description: "Voici une liste de toutes les commandes disponibles.\nPour plus d'informations : `*help <NomDeLaCommande>`",
                author: {
                    name: "HELP",
                    icon_url: "https://vignette.wikia.nocookie.net/mixedmartialarts/images/8/89/Help_logo.png/revision/latest?cb=20100314171646"
                },
                timestamp: true,
                fields: fields
            });
        }
        else {
            // Recherche de la commande
            let command = null;
            for (category in client.commands)
            {
                if (command == null)
                    command = client.commands[category].get(args[0]);
                else
                    break;
            }
            // Si commande non trouvee afficher une erreur
            if (command == null)
                return Msg.error('La commande **'+args[0]+'** n\'est pas une commande valide.\nTapez **'+Config.prefix+'help** pour avoir la liste des commandes');
            else if (command.doc == null)
                return Msg.error('Aucune documentation existante pour la commande **'+command.name+'**.');
            // Afficher la commande trouvee
            let doc = command.doc;
            let msg = {
                color: 3447003,
                title: doc.name,
                description: doc.description,
                author: {
                    name: "HELP : "+command.name.toUpperCase(),
                    icon_url: "https://vignette.wikia.nocookie.net/mixedmartialarts/images/8/89/Help_logo.png/revision/latest?cb=20100314171646"
                },
                timestamp: new Date(),
                footer: {
                    icon_url: "https://openclipart.org/image/2400px/svg_to_png/215499/users.png",
                    text: doc.author
                },
                fields: []
            };
            delete doc.name;
            delete doc.author;
            delete doc.description;
            for (field in doc)
                msg.fields.push({name: field.toUpperCase(), value: doc[field]});
            Msg.format(msg);
        }
    },
    get_commands_list : function(categories) {
        let data = {};
        for (category in categories)
        {
            data[category] = {name: category, commands: []};
            categories[category].list(true).forEach(function (value, key, map){
                data[category].commands.push('- '+value.name+(value.alias != undefined ? ' [#'+value.alias.join(', #')+']' : ''));
            });
            data[category].commands = data[category].commands.join(' \n ');
        }
        return data;
    }
};