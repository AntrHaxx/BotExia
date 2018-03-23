# BotExia

BotExia est une application basee surle module Discord.js permettant de gerer un bot Discord. Vous aurez la possibilite de creer et gerer des commandes simplement sans avoir a gerer en plus les petits soucis d'a cote. L'application offre un petit assortiment de modules simplifiant au maximum le developpement et enrichissant votre experience.

## Fonctionnalites

*	Creation de commandes personnalisees
	*	**Prefixes multiples**	pour ceux qui ne sont pas d'accord avec un prefixe
	*	**Alias de commandes** pour des acces multiples a la meme commande
	*	**Appels internes** invoquer des commandes depuis d'autres commandes pour creer des reponses en chaine
	*	**Cron Jobs**	permet de programmer des appels de commandes a des moments precis de maniere recurente
	*	**Permissions** Definissez qui a le droit d'executer votre commande et dans quel contexte

*	Documentations
	*	Un fichier de documentation dedie pour chaque commande
	*	Chargement et gestion automatique de la documentation

*	Internationalisation
	*	Support de diverses langues
	*	Mots cles de detection de traduction a mettre dans le module de messagerie ou de log

*	Messages riches preformates
	*	Messages stylises
	*	Envoi vers n'importe quel channel du serveur
		*	Channel unique
		*	Channels multiples
		*	Tous les channels a la fois

*	Logs stylises:
	*	Messages preformates temoignant divers status: info, success, warning, error
	*	Personnalisation poussee des messages de log grace a l'integration du module NodeJS **colors**

*	Basses de donnees: supporte de sqlite grace au module NodeJS **sqlite3**

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

*	**prefix**: Prefixe des commandes. Il sera utilise par le bot pour detecter que votre message est bien une commande et non un message classique. Vous pouvez definir un prefixe unique ou un tableau de prefixes acceptes.

*	**token**:	Token genere par Discord lors de la creation de l'appli Discord bot via leur plateforme.

*	**server_id**: Identifiant du serveur sur lequel le bot est installe.

*	**instance_owner**; Identifiant de l'utilisateur detenant le bot. Il permet d'eviter la reconnaissance de commandes externes dans le cas ou plusieures instances du meme bot se retrouveraient sur le meme serveur.

*	**accept_all_instances**; Active la reconnaissance des commandes externes.

*	**default_language**: Definit la langue par defaut utilisee par le module de traduction.

### Lancement

Le bot etant installe et configure vous etes enfin pret a le lancr. Si ce n'est pas deja fait, rendez-vous a la racine de votre projet et tapez `nodemon`. Ce module se chargera de lancer votre projet NodeJS et de relancer le serveur si un fichier du projet est modifie. Ainsi, vous pourrez coder et sauvegarder sans vous soucier du serveur (sauf pour les logs bugs bien sur :D).

Si une erreur fatale empeche le redemarrage du serveur par nodemon, forcez la fermeture du programme (Ctrl+C d'habitude) et relancez la commande `nodemon`.

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

#### Decomposition de la commande

La commande se compose de quatre parties principales

*	**name**; Le nom de la commande. Utilise lors de l'appel depuis le serveur. Dans le cas present, on tapera **\*ping**.

*	**alias**; Liste d'alias de la commande qui vous permettront d'appeler une commande avec divers noms. L'appel a **\*ping** et **\*tesla** aura comme reponse **Pong !**.

*	**permissions**: Permet de definir qui a le droit d'executer la commande et dans quel contexte. Dans le cas present, tout le monde peut appeler **\*ping** depuis le serveur, depuis un groupe de discussion ou encore en message direct au bot.

*	**execute**: Fonction principale appelee lors de l'appel a la commande. Elle recoit en argument un tableau contenant les mots tapes a la suite de vote commande. A l'interieur on trouve une condition verifiant que l'appel a la fonction se fait bien depuis un message Discord. On verra plus tard comment faire des appels internes aux commandes. Si l'appel provient bien d'un message, on renvoie un message a Discord, sinon on envoie la reponse au terminal.

#### Utiliser la commande

Une fois le bot lance avec la commande `nodemon`, allez sur votre serveur ou dans une discussion privee avec le bot et tapez **\*ping**.