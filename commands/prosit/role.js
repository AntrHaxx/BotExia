module.exports = {
    name : "role",
    permissions: {
        "*": "*"
    },
    execute(message, args, client){
        var channelRole = client.channels.find('name', 'role');

        const  pr = Load.json('pr');
        var { pro } = Load.json('prosit');
        const promo = Load.json('promo');
        var prosit = null;
        var tete = null;
        var role = null;
        var head = null;
        cal = parseInt(pro) % pr.length;

        const commands = message.content.split(/ +/);
        const command = commands[0];
        const rle = args.length ? args[0].toLowerCase() : null;

        if (pr[cal] != undefined)
                prosit = pr[cal];
        else 
            return Msg.error("Prosit Non trouver");

        if (promo[cal] != undefined)
            tete = promo[cal];
        else 
                return Msg.error("Tete non trouvée");

        switch(rle)
        {
            case 'animateur':
            role = prosit.animateur
            head = tete.animateur
            break;
            case 'gestionaire':
            role = prosit.inutile
            head = tete.inutile 
            break;
            case 'secretaire':
            role = prosit.secretaire
            head = tete.inutile
            break;
            case 'scribe':
            role = prosit.scribe
            head = tete.scribe 
            break;
        }

        const embed= {
            "title": "Role",
            "color": 34074, 
            "description" :"On est au prosit n°"+pro+"\nSi tu veux connaitre les autres roles n'hesite pas a taper `*role <NomDuRole>`"
            +"\n Liste des rôles : \n - Animateur \n - Secretaire \n - Scribe \n - Gestionnaire",
         
            "footer": {
                "text": "Exia.cesi | Promo St-Nazaire-2017"
            },
            "author": {
                "name": "Bot Exia v2.0",
                "icon_url" : "https://cdn.discordapp.com/attachments/400651374146355210/425232194773057536/color4.jpg"
            },
            "fields": [
                {
                    "name" : ""+rle,
                    "value" :  "" +role +head,
                    "color" : 34074,
                }
            ]}
    
        if (rle === "gestionaire"){
            channelRole.send({embed})
        }
        else if(rle === "animateur"){
            channelRole.send({embed})
        }
        else if(rle === "scribe"){
            channelRole.send({embed})
        }
        else if(rle === "secretaire"){
            channelRole.send({embed})
        }
        else{
            message.reply("Bro jsais pas ce qui marche pas la")
        }
    }
}