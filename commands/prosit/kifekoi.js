module.exports = {
	name : "kifekoi",
	description : "Sa sert pus a rien",
	usage : "`*kifekoi`",
	alias : ["role" ],
	permissions: {
		"*": "*"
	},
	execute(message){

		const pr = Load.json("pr");
		const { pro } = Load.json("prosit")
		var prosit = null;

		Msg.info(pro);

		if (pr[pro] != undefined)
			prosit = pr[pro];

		Msg.format({
      "title": "Kifekoi",
      "color": 2E4756,
      "footer": {
        "text": "Exia.cesi Promo St-Nazaire-2017"
      },
      "author": {
        "name": "Bot Exia v2.0"
      },
      "fields": [
        {
          "name" : "Animateur",
          "value" : "Ce coup si l'animateur c'est : " +prosit.animateur
        },
        {
          "name": "Secretaire",
          "value" :  "Bon aller go au tableaux "+prosit.secretaire
        },
        {
          "name" : "Scribe",
          "value" : "Aller hop hop hop on sort word et on prend en note "+prosit.scribe +"PS : t'a la commande `*template` y'a plus qu'a remplir"
        },
        {
          "name" : "Gestionaire",
          "value" : "Et ce coup la c'est a ton tour de se tourner les pouces : " +prosit.inutile
        }
      ]
    });
	}
}