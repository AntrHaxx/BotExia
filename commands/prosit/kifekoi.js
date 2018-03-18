exports = {
    name : "kifekoi",
    description : "Sa sert pus a rien",
    usage : "`*kifekoi`",
    execute(message){

        const { prosit, un, deux, trois, quatres, cinq, six, sept, huit, neuf, dix, onze, douze, animateur, secretaire, scribe, inutile } = require("./json/pr.json");
        const { pro } = require("./json/prosit.json")
        
        function changement()
{
    switch(pro%12)
		{
		//Prosit 1 
			case 1 :
				anim = pr.un.animateur;
				sec = pr.un.secretaire;
				scr = pr.un.scribe;
				inu = pr.un.inutile;
			break;
        //Prosit 2
			case 2 :
				anim = pr.deux.animateur;
				sec = pr.deux.secretaire;
				scr = pr.deux.scribe;
				inu = pr.deux.inutile;
			break;
        //Prosit 3
			case 3 :
			anim = pr.trois.animateur;
			sec = pr.trois.secretaire;
			scr = pr.trois.scribe;
			inu = pr.trois.inutile;
			break;
        //prosit 4
			case 4 :
			anim = pr.quatres.animateur;
			sec = pr.quatres.secretaire;
			scr = pr.quatres.scribe;
			inu = pr.quatres.inutile;
			break;
        //Prosit 5
			case 5 :
		    anim = pr.cinq.animateur;
			sec = pr.cinq.secretaire;
			scr = pr.cinq.scribe;
			inu = pr.cinq.inutile;
			break;
        //Prosit 6 
			case 6 :
			anim = pr.six.animateur;
			sec = pr.six.secretaire;
			scr = pr.six.scribe;
			inu = pr.six.inutile;
			break;
		//prosit 7 	
			case 7 :
			anim = pr.sept.animateur;
			sec = pr.sept.secretaire;
			scr = pr.sept.scribe;
			inu = pr.sept.inutile;
			break;
		//Prosit 8 	
			case 8 :
			anim = pr.huit.animateur;
			sec = pr.huit.secretaire;
			scr = pr.huit.scribe;
			inu = pr.huit.inutile;
			break;
        //Prosit 9
			case 9 :
			anim = pr.neuf.animateur;
			sec = pr.neuf.secretaire;
			scr = pr.neuf.scribe;
			inu = pr.neuf.inutile;
			break;
		//Prosit 10	
			case 10 :
			anim = pr.dix.animateur;
			sec = pr.dix.secretaire;
			scr = pr.dix.scribe;
			inu = pr.dix.inutile;
			break;
		//Prosit 11
			case 11 :
			anim = pr.onze.animateur;
			sec = pr.onze.secretaire;
			scr = pr.onze.scribe;
			inu = pr.onze.inutile;
			break;
        //Prosit 12 
			case 12 :
			anim = pr.douze.animateur;
			sec = pr.douze.secretaire;
			scr = pr.douze.scribe;
			inu = pr.douze.inutile;
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
              "text": "Exia.cesi Promo St-Nazaire-2017"
            },
            "author": {
              "name": "Bot Exia v2.0",
            },
            "fields": [
              {
                "name" : "Animateur",
                "value" : "Ce coup si l'animateur c'est : " +animateur
              },
              {
                "name": "Secretaire",
                "value" :  "Bon aller go au tableaux "+secretaire
              },
              {
                "name" : "Scribe",
                "value" : "Aller hop hop hop on sort word et on prend en note "+scribe +"PS : t'a la commande `*template` y'a plus qu'a remplir"
              },
              {
                  "name" : "Gestionaire",
                  "value" : "Et ce coup la c'est a ton tour de se tourner les pouces : " +inutile
              }
            ]
          };

          changement();
          message.channel.send({embed})



    },
}