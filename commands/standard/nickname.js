module.exports = {
    name : "username",
    permissions: {
        "*": "*"
    },
    execute(message, args, client)
    {
        const commands = message.content.split(/ +/);
        const command = commands[0];
        const nick = args.length ? args[0].toLowerCase() : null;

        message.channel.send(" Nick : " +nick);
        client.user.setUsername(nick)
        .then(pseudo => console.log("Mon nouveu pseudo est : ${pseudo.nickname}"));
    }
}
