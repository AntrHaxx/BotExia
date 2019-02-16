module.exports = {
    name: "prositaller",
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
            ["Gwn", "<:gwegwe:377449539499589633>"],
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

        var temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        function random(taille) {
            return Math.floor(Math.random() * taille);
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
            const randomMan = random(21);
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
                while (randomMan == 0 && maxOpe < 501) {
                    Log.info("La personne est en cours de choix" + maxOpe);
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

        function setMC() {
            var mc = args[0];
            var mtcl = [];

            if (isNaN(mc)) {
                Msg.error("Ce n'est pas un nombre valide");
            } else {
                for (var i = 0; i < mc; i++) {
                    mtcl[i] = "**La personne n'a pas pu être tirée**";
                }
            }
            return mtcl
        }

        function pickMotcle() {
            var tablemtcl = setMC();

            for (var a = 0; a < tablemtcl.length; a++) {
                var randomguy = checkIfRandomIsAlreadyPicked();

                tablemtcl[a] = randomguy;
            }
            return tablemtcl;
        }

        function setPBM() {
            var prblm = [];

            prblm[0] = "**La personne n'a pas pu être tirée**";

            return prblm;
        }


        function pickPbm() {
            var tablepbm = setPBM();

            for (var a = 0; a < tablepbm.length; a++) {
                var randomguy = checkIfRandomIsAlreadyPicked();

                tablepbm[a] = randomguy;
            }
            return tablepbm;
        }

        function setContraints() {
            var crt = args[1];
            var crts = [];

            if (isNaN(crt)) {
                Msg.error("Ce n'est pas un nombre valide");
            } else {
                for (var i = 0; i < crt; i++) {
                    crts[i] = "**La personne n'a pas pu être tirée**";
                }
            }
            return crts;
        }


        function pickContraints() {
            var tablecontraints = setContraints();

            for (var a = 0; a < tablecontraints.length; a++) {
                var randomguy = checkIfRandomIsAlreadyPicked();

                tablecontraints[a] = randomguy;
            }
            return tablecontraints;
        }

        function setHypothesys() {
            var hp = args[2];
            var hyp = [];

            if (isNaN(hp)) {
                Msg.error("Ce n'est pas un nombre valide");
            } else {
                for (var i = 0; i < hp; i++) {
                    hyp[i] = "**La personne n'a pas pu être tirée**";
                }
            }
            return hyp;
        }


        function pickHypothesis() {
            var tableHypotesis = setHypothesys();

            for (var a = 0; a < tableHypotesis.length; a++) {
                var randomguy = checkIfRandomIsAlreadyPicked();

                tableHypotesis[a] = randomguy;
            }
            return tableHypotesis;
        }

        Msg.motcle(pickMotcle());
        Msg.pbm(pickPbm());
        Msg.contraintes(pickContraints());
        Msg.hypothese(pickHypothesis());

    }
}