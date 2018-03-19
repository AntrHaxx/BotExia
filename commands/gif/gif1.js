module.exports = {
    name : "suce",
    description : "Magnifique gif de Remi sucant une bite",
    usage : "`*suce`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/Suce.gif"
        })
    },
}