module.exports = {
    name : "kifekoi",
    description : "Sa sert pus a rien",
    usage : "`*kifekoi`",
    permissions: {
        "*": "*"
    },
    execute(message, member){
        const  pr = Load.json('pr');
        var { pro } = Load.json('prosit');
        const promo = Load.json('promo');
        var prosit = null;
        var tete = null;
        pro = parseInt(pro);
        cal = (parseInt(pro) %11);

        if (pr[cal] != undefined)
            prosit = pr[cal];
        else
            return Msg.error("Prosit non trouve");

        if (promo[cal] != undefined)
            tete = promo[cal];
        else 
            return Msg.error("Tete non trouvée");

        //scr = prosit.scribe;

        const embed = {
            "title": "Kifekoi",
            "color": 34074, 
            "description" : "On est au prosit : " +pro,
     
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
                    "value" : "Ce coup ci l'animateur c'est : " +prosit.animateur +tete.animateur,
                },
                {
                    "name": "Secretaire",
                    "value" :  "Bon aller go au tableau " +prosit.secretaire +tete.secretaire,
                },
                {
                    "name" : "Scribe",
                    "value" : "Aller hop hop hop on sort word et on prend en note " +prosit.scribe +tete.scribe +"\nPS : tu as la commande `*template` y'a plus qu'a remplir !",
                },
                {
                    "name" : "Gestionaire",
                    "value" : "Et ce coup là c'est à ton tour de te tourner les pouces : " +prosit.inutile +tete.inutile,
                }
            ]
        }; 
        var role = client.channels.find("name", "👥roles");
        role.send({embed});
    },
}