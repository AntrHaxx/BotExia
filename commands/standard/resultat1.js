//import mcdo from './indx.js';
var { mcdo, bk, ange, geant, enfer } = require('../../index.js');

module.exports = {
    name : "resultatcsl",
    description : "Affiche le resultat du vote dans la console",
    usage : "`*resultatcsl`",
    execute(message){
    	var results = require('../../json/voteManger.json');
        console.log('Resultat des votes:');
    	for (res in results)
    		console.log(res+' : '+results[res]);
        message.channel.send("Les resultats sont affiché dans la console");
    }
};