module.exports = {
    name : "tank",
    description : "Je suis une description",
    usage : "`*tank`",
    execute(message){
        message.channel.send({
        file : "image/FransoPark.gif"
        })
    },
}