module.exports = {
    name : "presence",
    permissions: {
        "*": "*"
    },
    execution(message, args, client)
    {
        const commands = message.content.split(/ +/);
        const command = commands[0];
        const pres = args.length ? args[0].toLowerCase() : null;
        const stat = args.length ? args[1].toLowerCase() : null;

        client.user.setPresence({ game: { name : pres}, status : stat})
        .then(console.log);
    }
}