module.exports = {
    name:"getpp",
    permissions:{
        "*":"*"
    },
    execute(message, args){
        if(args == 0){
            var pp = message.author.avatarURL;
        }else{
            var pp = args[0];
        }
        Msg.info(pp);
    }
}