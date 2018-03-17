module.exports = {
	name : 'chuck',
	description : "Genere un Chuck Norris fact aleatoire",
	usage :'`*chuck`',
	execute(message, args, client){
    	const accents = require('../../json/accents.json');
		const request = require('request');

		var url = 'https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1';
		request({
		    url: 'https://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1',
		    json: true,
		    encoding: 'utf-8',
		}, function (error, response, body) {

		    if (!error && response.statusCode === 200) {
		    	let str = body[0].fact;
		    	for (acc in accents)
		    	{
		    		let regex = new RegExp(acc, "g");
		    		str = str.replace(regex, accents[acc]);
		    	}
		        message.channel.send(str);
		    }
		});
	}
};