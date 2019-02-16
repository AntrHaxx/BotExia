module.exports = {
    name: "tkivaferkoi",
    permissions: {
        "*": "*",
    },
    execute(message, args) {
        for(var i = 0; i<1000; i++){
            Log.info(i);
            message.channel.send("*kivaferkoi 4");
        }
    }
}