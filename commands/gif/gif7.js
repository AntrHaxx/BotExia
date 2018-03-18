module.exports = {
    name : "vomis",
    description : "C'est horrible hein ?",
    usage : "`*vomis`",
    execute(message){
        message.channel.send({
        file : "image/vomis.gif"
        })
    },
}