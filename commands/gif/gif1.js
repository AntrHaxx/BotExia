module.exports = {
    name : "suce",
    description : "Magnifique gif de Remi sucant une bite",
    usage : "`*suce`",
    execute(message){
        message.channel.send({
        file : "image/Suce.gif"
        })
    },
}