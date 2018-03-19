module.exports = {
    name : "jul",
    description : "Bon t'a besoin d'un dessin, fais la commande et regarde le gif BORDEL !",
    usage : "`*jul`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "./image/Jul.gif"
        })
    },
}