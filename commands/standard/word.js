module.exports = {
    name : "template",
    description : "Donne un template pour le pa",
    usage : "`*template`",
    permissions: {
        "*": "*"
    },
    execute(message){
        var other = client.channels.find('name', '📑prosit-aller');
        other.send("Voici le template", {
            file : "./Prosit.docx" 
        }
    )
    },
}