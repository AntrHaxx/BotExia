module.exports = {
    name : 'send',
    execute(message, args, client){
    	const channel = args[0];
    	const msg = args.slice(1).join(' ');
    	const destiny = client.channels.find('name', channel);
    	if (destiny == null)
    		client.channel.reply('Le channel '+channel+' n\est pas valide.');
    	else
    		destiny.send(msg);
    }
};