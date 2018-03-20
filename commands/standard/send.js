module.exports = {
	name : 'send',
	permissions: {
        "*": "*"
    },
    execute(message, args, client){
    	const channel = args[0];
    	const msg = args.slice(1).join(' ');
    	if (!Msg.info(msg, channel))
    		Msg.error('Le channel '+channel+' n\est pas valide.');
    }
};