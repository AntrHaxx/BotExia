module.exports = {
    name : "infog",
    description : "Info relative au Gif",
    usage : "`*infog <NomDuGif>`",
    execute(message, args){
        const { gif } = message.client;
        const commandGif = gif.get(args[0]);

		if (!args.length) {
			message.channel.send('N\'oulis pas de mettre la nom de la commande');
		}
		else {
			if (!gif.has(args[0])) {
				return message.reply('Ce n\'est pas une commande valide');
			}
            else {
                message.channel.send("**Nom : **" +commandGif.name);
                message.channel.send("**Description : **" + commandGif.description);
                message.channel.send("**Commande : **" +commandGif.usage);
            }
		}
    }
};