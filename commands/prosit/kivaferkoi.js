module.exports = {
    name: "kivaferkoi",
    permissions: {
        "*": "*",
    },
    execute(message, args) {

        var gens = [
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

        var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        function random(taille) {
            return Math.floor(Math.random() * taille);
        }

        function checkN() {
            const atest = args[0];
            var ret = 0;

            if (atest > 11) {
                ret = 1;
            } else {
                ret = 0;
            }

            return ret;
        }

        function checkt(num) {
            var hasPart = 0;

            if (temp[num] != 0) {
                hasPart = 1;
            } else {
                hasPart = 0;
            }

            return hasPart;
        };

        function pickARandom() {
            const randomMan = random(11);
            const check = checkt(randomMan);
            let a;

            if (check == 0) {
                a = gens[randomMan][0] + " " + gens[randomMan][1];
            } else {
                a = 0;
            }

            temp[randomMan] = 1;

            return a;
        }

        function checkIfRandomIsAlreadyPicked() {
            var randomMan = pickARandom();
            var randomFinal = "Le personne n'a pas pu etre tirée <:amiel:517322972919496706>";
            var maxOpe = 0;

            if (randomMan == 0) {
                Log.error("La personne à deja été tirée");
                while (randomMan == 0 && maxOpe < 500) {
                    Log.info("La personne est en cours de choix : " + maxOpe);
                    randomMan = pickARandom();
                    maxOpe++;
                }
                Log.info(randomMan);
                randomFinal = randomMan;
                Log.success("La personne tirée est : " + randomFinal);
            } else {
                randomFinal = randomMan;
                Log.success("La personne tirée est : " + randomFinal);
            }
            return randomFinal;
        }

        function setPartie() {
            var nbrdepartie = args[0];
            var partie = [];

            if (checkN() == 1) {
                Msg.error("On est que 11 dans la promo bouffon");
            } else {
                for (var i = 0; i < nbrdepartie; i++) {
                    partie[i] = "**La personne n'a pas pu être tirée**";
                }
            }
            return partie
        }

        function assign() {
            var table = setPartie();
            Log.info("Te pa senser etre la");
            for (var b = 0; b < table.length; b++) {
                var randomGuy = checkIfRandomIsAlreadyPicked();
                if (randomGuy != 0) {
                    table[b] = randomGuy;
                } else {
                    Log.error("Wsh la c pas normal");
                }
            }
            return table;
        }

        if(checkN() == 0){
            Msg.kivaferkoi(assign());
            Log.warning("-------------------------------------------");
        }
    }
}