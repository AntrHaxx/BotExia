module.exports = {
    name : "zizi",
    description : "Penis",
    usage : "`*zizi`",
    permissions: {
        "*": "*"
    },
    execute(message){
        message.channel.send({
        file : "image/zizi.jpg"
        })
    },
}