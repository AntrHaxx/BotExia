module.exports = {
    name: "kvfk",
    permissions: {
        "*": "*",
    },
    execute(message, args) {

        const gens = [
            ["Gurvan", "<:gurvan:377403236631445505>"],
            ["MMouky", "<:mmouky:377453448594980868>"],
            ["Erwan", "<:erwan:421697676795576332>"],
            ["François", "<:franso:424220588282740736>"],
            ["Kevkev", "<:kevkev:377452016655663114>"],
            ["Pauline", "<:pauline:377452473817890816>"],
            ["Benjamin", "<:benj:377447671243210755>"],
            ["Louis", "<:louis:377400607990087680>"],
            ["Julien", "<:julien:377451426286141440>"],
            ["Remi", "<:remi:377401668477911042>"],
            ["Gwn", "<:gwegwe:377449539499589633>"]
        ];
        let fs = require('fs');

        const temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        /**
         * Permet de recuperer les gens ayant deja fait une partie avant
         * @param args
         */
        function getAlreadyPicked(args) {
            let json = JSON.parse(fs.readFileSync("./json/kivaferkoi.json"));
            for (let a = 0; a < json.AlreadyPicked.length; a++) {
                let place = json.AlreadyPicked[a].toString().indexOf("<");
                let name = json.AlreadyPicked[a].substring(0, place);
                for (let b = 0; b < gens.length; b++) {
                    if (json.AlreadyPicked[a].match(gens[b][0])) {
                        Log.success("Name : "+name + " Tab : "+gens[b][0]);
                        gens.splice(b, 1);
                    }
                }
            }
        }

        /**
         * Renvoie un nombre random
         * @param taille la range du nombre a tirée
         * @returns {number} le nombre random
         */
        function random(taille) {
            return Math.floor(Math.random() * taille);
        }

        /**
         * Permet de check si le nombre de personne à tiré est inferieur a 11 (nombre de personne de la promo)
         * @returns {number} 0 -> C inferieur a 11 / 1 -> C superieur a 11
         */
        function checkN() {
            const atest = args[0];
            let ret = 0;

            if (atest > 11) {
                ret = 1;
            } else {
                ret = 0;
            }

            return ret;
        }

        /**
         * Permet de verifier dans le tableau temporaire la personne a deja été tirée
         * @param num la personne a test
         * @returns {number} 0 -> La personne a pas été tirée / 1 -> La personne a été tirée
         */
        function checkt(num) {
            let hasPart = 0;

            if (temp[num] !== 0) {
                hasPart = 1;
            } else {
                hasPart = 0;
            }

            return hasPart;
        };

        /**
         * Tire qlq et change son poid a 1
         * @returns {number|string} renvoie le string contenant la personne tiré / renvoie 0 si la personne a déja été tirée
         */
        function pickARandom() {
            const randomMan = random(gens.length);
            const check = checkt(randomMan);
            let a;

            if (check === 0) {
                a = gens[randomMan][0] + " " + gens[randomMan][1];
            } else {
                a = 0;
            }
            temp[randomMan] = 1;
            return a;
        }

        /**
         * Permet de verifier que la personne n'a pas deja été tirée
         * @returns {number|string}
         */
        function checkIfRandomIsAlreadyPicked() {
            let randomMan = pickARandom();
            let randomFinal = "Le personne n'a pas pu etre tirée <:amiel:517322972919496706>";
            let maxOpe = 0;

            if (randomMan === 0) {
                Log.error("La personne à deja été tirée");
                while (randomMan === 0 && maxOpe < 25) {
                    Log.info("La personne est en cours de choix : " + maxOpe);
                    randomMan = pickARandom();
                    maxOpe++;
                }
                randomFinal = randomMan;
                Log.success("La personne tirée est : " + randomFinal);
            } else {
                randomFinal = randomMan;
                Log.success("La personne tirée est : " + randomFinal);
            }
            return randomFinal;
        }

        /**
         * Set le nombre de parties à tirée
         * @returns {Array}
         */
        function setPartie() {
            const nbrdepartie = args[0];
            const partie = [];

            if (checkN() === 1) {
                Msg.error("On est que 11 dans la promo bouffon");
            } else {
                for (let i = 0; i < nbrdepartie; i++) {
                    partie[i] = "La personne n'a pas pu etre tirée <:pauline:377452473817890816>";
                }
            }
            return partie
        }

        /**
         * Permet de renvoyer le tableau de personnes tirée
         * @returns {Array}
         */
        function assign() {
            getAlreadyPicked(args);
            let table = setPartie();
            let temp = JSON.parse(fs.readFileSync("./json/kivaferkoi.json"));
            temp.AlreadyPicked = [];
            for (let b = 0; b < table.length; b++) {
                const randomGuy = checkIfRandomIsAlreadyPicked();
                if (randomGuy !== 0) {
                    table[b] = randomGuy;
                    temp.AlreadyPicked[b] = randomGuy;
                } else {
                    Log.error("Wsh la c pas normal");
                }
            }
            let out = JSON.stringify(temp);
            fs.writeFileSync("./json/kivaferkoi.json", out);
            return table;
        }

        /**
         * Sur-verifie que le nombre de partie est inferieur a 11
         */
        if (checkN() === 0) {
            Msg.kivaferkoi(assign());
            Log.warning("-------------------------------------------");
        }
    }
};