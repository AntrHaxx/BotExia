module.exports = {
    name : "bol",
    description : "Penis",
    usage : "`*pasdebol`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/bol.png"
        })
    },
}