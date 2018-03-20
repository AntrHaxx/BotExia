module.exports = {
    name : "prank",
    description : "Penis",
    usage : "`*revolution`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/gotem.png"
        })
    },
}