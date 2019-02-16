module.exports = {
    name : "gif",
    description : "Donne la liste de tout les gif disponnible",
    usage : "`*gif`",
    permissions :{
        "*": "*"
    },
    execute(message){
       message.channel.send("**Voici une liste de tous les gifs disponibles :** \n\n **-** suce \n **-** singe \n **-** ez  \n **-** jul \n **-** tank \n **-** creneau \n\n **Pour plus d'informations** : `*infog <NomDuGif>`");
    }
};