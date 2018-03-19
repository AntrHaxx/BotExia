module.exports = {
    name : "vomis",
    description : "C'est horrible hein ?",
    usage : "`*vomis`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/vomis.gif"
        })
    },
}