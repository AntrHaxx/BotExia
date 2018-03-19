module.exports = {
    name : "singe",
    description : "Magnifique gif de trois personnes bougeant sur what is love ",
    usage : "`*singe`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/Singe.gif"
        })
    },
}