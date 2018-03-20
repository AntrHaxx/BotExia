module.exports = {
    name : "role",
    permissions: {
        "*": "*"
    },
    execute(message, args, client){
        var channelRole = client.channels.find('name', 'role');

        const  pr = require("../../json/pr.json");
		const { pro } = require("../../json/prosit.json");
		var prosit = null;

        const commands = message.content.split(/ +/);
        const command = commands[0];
        const rle = args.length ? args[0].toLowerCase() : null;

        if (pr[pro] != undefined)
                prosit = pr[pro];

        const embed = {
            "title": "Kifekoi",
			"color": 34074, 
	 
			"footer": {
				"text": "Exia.cesi | Promo St-Nazaire-2017"
			},
			"author": {
				"name": "Bot Exia v2.0",
				"icon_url" : "https://cdn.discordapp.com/attachments/400651374146355210/425232194773057536/color4.jpg"
			},
			"fields": [
				{
					"name" : "Animateur",
					"value" : "Ce coup ci l'animateur c'est : " +prosit.animateur
				},
				{
					"name": "Secretaire",
					"value" :  "Bon aller go au tableau " +prosit.secretaire
				},
				{
					"name" : "Scribe",
					"value" : "Aller hop hop hop on sort word et on prend en note " +prosit.scribe +"\nPS : tu as la commande `*template` y'a plus qu'a remplir !"
				},
				{
					"name" : "Gestionaire",
					"value" : "Et ce coup là c'est à ton tour de te tourner les pouces : " +prosit.inutile
                }
            ]}
        
        

        if (rle === "gestionaire"){
            channelRole.send({embed})
        }
        else if(rle === "animateur"){
            channelRole.send({anim})
        }
        else if(rle === "scribe"){
            channelRole.send({scrb})
        }
        else if(rle === "secretaire"){
            channelRole.send({scrc})
        }
        else{
            message.reply("Bro jsais pas ce qui marche pas la")
        }
    }
}