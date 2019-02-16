module.exports = {
    name: 'test',
    permissions: {
        "*": "*"
    },
    execute(message) {
        client.channels.find('name', "général").send("||C'est un message spoiler || ```||Tu met ton msg la||```");

    }
};