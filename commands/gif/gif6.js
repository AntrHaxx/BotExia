module.exports = {
    name : "creneau",
    description : "Tu lis vraiment cette merde ?",
    usage : "`*creneau`",
    execute(message){
        message.channel.send({
        file : "image/FransoDream.gif"
        })
    },
}