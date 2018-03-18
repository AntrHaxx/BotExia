module.exports = {
    name : "template",
    description : "Donne un template pour le pa",
    usage : "`*template`",
    execute(message){
        var other = global.client.channels.find('name', 'prosit-aller');
        other.send("Voici le template", {
            file : "./Prosit.docx" 
        }
    )
    },
}