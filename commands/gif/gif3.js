module.exports = {
    name : "ez",
    description : "Magnifique gif d'ahmed apres chaques cctl",
    usage : "`*ez`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/EZ.gif"
        })
    },
}