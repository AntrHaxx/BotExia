# BotExia

## Installation

### Prerequis

Vous devez avoir installe NodeJS et NPM au prealable sur votre machine.

Vous trouverez les executables adaptes a votre systeme d'exploitation sur ce lien: https://nodejs.org/en/

Utilisateurs de Debien, cette commande suffira: `sudo apy-get install nodejs npm`
### Etapes

1.	Cloner le projet dans votre dossier de travail

2.	Rendez-vous dans le dossier nouvellement cree et lancer la commande `npm install`

3.	Renommer le fichier **json/config.sample.json** en **json/config.json** et changez les valeurs necessaires

4.	Lancez la commande `nodemon`

5.	Have fun!

## Utilisation

Creez des commandes riches et personnalisees simplement grace aux divers modules proposes et a une standardisation permissive.

### Configuration

Dans le dossier json vous trouverez un fichier **config.smple.json** que vous renommerez en **config.json**.

Remplissez les quelques champs requis et vous serez prets a commander votre bot!

### Commandes standard

Un panel de commandes standard sont a votre disposition afin de vous montrer par l'exemple comment est structuree une commande et les possibilites qu'elle offre. Par exemple la commande standard ping:

```javascript
module.exports = {
	name : 'ping',
	alias: ["tesla"],
	permissions: {
		"*": "*"
	},
	execute(args){
		if (message == null || message.author == undefined)
			Log.info("Pong! "+client.ping+"ms");
		else
			Msg.info("Pong! "+client.ping+"ms");
	}
};
```

Cette commande a pour but de repondre **Pong !** Lorsque vous tapez la commande \*ping sur votre serveur. Elle sert notamment a savoir si le bot est actif.

### Decomposition de la commande

La commande se compose de quatre parties principales

*	**name**; Le nom de la commande. Utilise lors de l'appel depuis le serveur.

*	**alias**; Liste d'alias de la commande qui vous permettront d'appeler une commande avec divers noms. L'appel a **\*ping** et **\*tesla** aura comme reponse **Pong !**.

*	**permissions**: Permet de definir qui a le droit d'executer la commande et dans quel contexte. Dans le cas present, tout le monde peut appeler **\*ping** depuis le serveur, depuis un groupe de discussion ou encore en message direct au bot.

*	**execute**: Fonction principale appelee lors de l'appel a la commande. Elle recoit en argument un tableau contenant les mots tapes a la suite de vote commande. A l'interieur on trouve une condition verifiant que l'appel a la fonction se fait bien depuis un message Discord. On verra plus tard comment faire des appels internes aux commandes. Si l'appel provient bien d'un message, on renvoie un message a Discord, sinon on envoie la reponse au terminal.