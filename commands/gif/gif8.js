module.exports = {
    name : "rip",
    description : "Penis",
    usage : "`*rip`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/rip.gif"
        })
    },
}