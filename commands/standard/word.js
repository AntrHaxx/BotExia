module.exports = {
    name : "template",
    description : "Donne un template pour le pa",
    usage : "`*template`",
    permissions: {
        "*": "*"
    },
    execute(message){
        var other = client.channels.get('420865180541648896');
        other.send("Voici le template", {
            file : "./Prosit.docx" 
        }
    )
    },
}