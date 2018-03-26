module.exports = {
    name : "pasdebol",
    description : "Penis",
    usage : "`*pasdebol`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/pasdebol.png"
        })
    },
}