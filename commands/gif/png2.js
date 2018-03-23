module.exports = {
    name : "chance",
    description : "Penis",
    usage : "`*chance`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/chance.png"
        })
    },
}