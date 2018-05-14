module.exports = {
    name : "clear",
    description : "Permet d'effacer jusqu'a 99 messages",
    usage : "`*clear <NbrDeMessages>`",
    permissions: {
        "*": "*"
    },
    execute(message, args){
        const amount = parseInt(args[0]) +1
        
        if (isNaN(amount)) {
            return message.reply('Ce n\'est pas un nombre valable');
        }
        else if (amount <= 1 || amount > 99) {
            return message.reply('Le nombre doit etre entre 1 et 99');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('Il y a eu une erreur pour delete');
        });
    }
};