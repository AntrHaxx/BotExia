module.exports = {
    name : "bravo",
    description : "Penis",
    usage : "`*bravo`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/video.mp4"
        })
    },
}