module.exports = {
    name: "stat",
    permissions: {
        "*": "*",
    },
    execute(message, args) {

        var Gurvan = 0;
        var MMouky= 0;
        var Erwan = 0;
        var François = 0;
        var Kevkev = 0;
        var Pauline =0;
        var Benjamin = 0;
        var Louis =0;
        var Julien = 0
        var Remi = 0;
        var Gwn = 0;

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

        //permet de checker si la valeure entrée est supeirieure a 11 et si c'est le cas renvoie 0 sinon renvoie 1
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

        function pickARandom() {
            const randomMan = random(11);
            let a = gens[randomMan][0];
            return a;
        }

        function checkIfRandomIsAlreadyPicked() {
            var randomMan = pickARandom();
            var randomFinal = "Le personne n'a pas pu etre tirée <:amiel:517322972919496706>";
            var maxOpe = 0;

            randomFinal = randomMan;
            Log.success("La personne tirée est : " + randomFinal);

            switch (randomFinal) {
                case "Gurvan":
                    Gurvan = Gurvan+1;
                    Log.info(Gurvan);
                    break;
                case "MMouky":
                    MMouky = MMouky +1;
                    Log.info(MMouky);
                    break;
                case "Erwan":
                    Erwan++;
                    Log.info(Erwan);
                    break;
                case "François":
                    François++;
                    Log.info(François);
                    break;
                case "Kevkev":
                    Kevkev++;
                    Log.info(Kevkev);
                    break;
                case "Pauline":
                    Pauline++;
                    Log.info(Pauline);
                    break;
                case "Benjamin":
                    Benjamin++;
                    Log.info(Benjamin);
                    break;
                case "Louis":
                    Louis++;
                    Log.info(Louis);
                    break;
                case "Julien":
                    Julien++;
                    Log.info(Julien);
                    break;
                case "Remi":
                    Remi++;
                    Log.info(Remi);
                    break;
                case "Gwn":
                    Gwn++;
                    Log.info(Gwn);
                    break;
            }

            return randomFinal;
        }

        function assign() {
            var n=0;
            while(n<1000){
                var randomGuy = checkIfRandomIsAlreadyPicked();
                n++;
            }
            return randomGuy;
        }

        function stat() {
            var table = [];
            assign();

            Gurvan = (Gurvan / 1000) * 100;
            table[0] = "Gurvan : "+Gurvan+"%";
            Log.info(Gurvan + "%");

            MMouky = (MMouky / 1000) * 100;
            table[1] = "Mmouky : "+MMouky+"%";

            Erwan = (Erwan / 1000) * 100;
            table[2] = "Erwann : "+Erwan+"%";

            François = (François / 1000) * 100;
            table[3] = "François : "+François+"%";

            Kevkev = (Kevkev / 1000) * 100;
            table[4] = "Kevkev : "+Kevkev+"%";

            Pauline = (Pauline / 1000) * 100;
            table[5] = "Pauline : "+Pauline+"%";

            Benjamin = (Benjamin / 1000) * 100;
            table[6] = "Benjamin : "+Benjamin+"%";

            Louis = (Louis / 1000) * 100;
            table[7] = "Louis : "+Louis+"%";

            Julien = (Julien / 1000) * 100;
            table[8] = "Julien : "+Julien+"%";

            Remi = (Remi / 1000) * 100;
            table[9] = "Remi : "+Remi+"%";

            Gwn = (Gwn / 1000) * 100;
            table[10] = "Gwn : "+Gwn+"%";

            return table;
        }

        if (checkN() === 0) {
            Msg.kivaferkoi(stat());
        }
    }
}