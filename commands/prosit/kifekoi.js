module.exports = {
    name : "kifekoi",
    description : "Sa sert pus a rien",
		usage : "`*kifekoi`",
		alias : ["role"],
		permissions: {
        "*": "*"
    },
    execute(message){
		console.log("La Commande elle marche presque");

    const { pr, un, deux, trois, quatres, cinq, six, sept, huit, neuf, dix, onze, douze, animateur, secretaire, scribe, inutile } = require("../../json/pr.json");
		const { pro } = require("../../json/prosit.json")
		
		var prositAller = client.channels.find("name", "role");
		var anim;
		var scr;
		var sec;
		var inu;		

		var temp = parseFloat(pro);

		console.log("Sa marche");

  function changement()
	{
    switch(temp%12)
		{
		//Prosit 1 
			case 1 :
				anim = un.animateur;
				sec = un.secretaire;
				scr = un.scribe;
				inu = un.inutile;
			break;
        //Prosit 2
			case 2 :
				anim = deux.animateur;
				sec = deux.secretaire;
				scr = deux.scribe;
				inu = deux.inutile;
			break;
        //Prosit 3
			case 3 :
			anim = trois.animateur;
			sec = trois.secretaire;
			scr = trois.scribe;
			inu = trois.inutile;
			break;
        //prosit 4
			case 4 :
			anim = quatres.animateur;
			sec = quatres.secretaire;
			scr = quatres.scribe;
			inu = quatres.inutile;
			break;
        //Prosit 5
			case 5 :
		  anim = cinq.animateur;
			sec = cinq.secretaire;
			scr = cinq.scribe;
			inu = cinq.inutile;
			break;
        //Prosit 6 
			case 6 :
			anim = six.animateur;
			sec = six.secretaire;
			scr = six.scribe;
			inu = six.inutile;
			break;
		//prosit 7 	
			case 7 :
			anim = sept.animateur;
			sec = sept.secretaire;
			scr = sept.scribe;
			inu = sept.inutile;
			break;
		//Prosit 8 	
			case 8 :
			anim = huit.animateur;
			sec = huit.secretaire;
			scr = huit.scribe;
			inu = huit.inutile;
			break;
        //Prosit 9
			case 9 :
			anim = neuf.animateur;
			sec = neuf.secretaire;
			scr = neuf.scribe;
			inu = neuf.inutile;
			break;
		//Prosit 10	
			case 10 :
			anim = dix.animateur;
			sec = dix.secretaire;
			scr = dix.scribe;
			inu = dix.inutile;
			break;
		//Prosit 11
			case 11 :
			anim = onze.animateur;
			sec = onze.secretaire;
			scr = onze.scribe;
			inu = onze.inutile;
			break;
        //Prosit 12 
			case 12 :
			anim = douze.animateur;
			sec = douze.secretaire;
			scr = douze.scribe;
			inu = douze.inutile;
			break;
			default : 
			console.log("pr : " +pro);
      break;
  	}
	}

  const embed = {
		"title": "Kifekoi",
		"color": 2E4756, 
	 
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
				"value" : "Ce coup ci l'animateur c'est : " +anim
			},
			{
				"name": "Secretaire",
				"value" :  "Bon aller go au tableau " +sec
			},
			{
				"name" : "Scribe",
				"value" : "Aller hop hop hop on sort word et on prend en note " +scr +"\nPS : tu as la commande `*template` y'a plus qu'a remplir"
			},
			{
				"name" : "Gestionaire",
				"value" : "Et ce coup là c'est à ton tour de te tourner les pouces : " +inu
			}
		]
	};     

  changement();
	prositAller.send({embed})
	message.reply("SALUT "+onze.animateur);
	message.reply("Pro " +(temp%12));
  },
}