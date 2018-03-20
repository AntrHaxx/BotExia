module.exports = {
    name : "kifekoi",
    description : "Sa sert pus a rien",
		usage : "`*kifekoi`",
		permissions: {
        "*": "*"
    },
    execute(message){
			const  pr = require("../../json/pr.json");
			const { pro } = require("../../json/prosit.json");
			var prosit = null;
		
			var prositAller = client.channels.find("name", "role");

<<<<<<< HEAD
			if (pr[pro] != undefined)
				prosit = pr[pro];
=======
		const pr = Load.json("pr");
		const { pro } = Load.json("prosit")
		var prosit = null;
>>>>>>> 73f1709f4878adf226711b9ef6d21f6f29e05b81

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
			]
		};     

	prositAller.send({embed})
	
	console.log("Sa marche");
  },
}