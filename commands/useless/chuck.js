module.exports = {
	name : 'chuck',
	permissions: {
		"*": "*"
	},
	execute(message, args, client){
    	const accents = Load.json('accents');
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

				Msg.format({
					color: 0xFF0000,
					description: str,
					thumbnail: "https://vignette.wikia.nocookie.net/deathbattle/images/4/47/Chuck_norris_PNG18.png/revision/latest?cb=20170919105155",
					author : {
						name: "Chuck Norris Fact",
						icon_url: "https://i.pinimg.com/originals/ed/ea/89/edea891d05f695a8bb235fe0057223b7.png"
					}
				});
		    }
		});
	}
};