module.exports = {
    name : "tank",
    description : "Je suis une description",
    usage : "`*tank`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/FransoPark.gif"
        })
    },
}