module.exports = {
    name : 'send',
    execute(message, args, client){
    	const channel = args[0];
    	const msg = args.slice(1).join(' ');
    	if (!global.Msg.send(msg, channel))
    		global.Msg.error('Le channel '+channel+' n\est pas valide.');
    }
};