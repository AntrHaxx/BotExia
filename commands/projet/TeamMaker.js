module.exports = {
    name: "team",
    permissions: {
        "*": "*"
    },
    execute(message) {
        const member = [
            [0, 2.5], //gwn
            [1, 2.5], //gurvan
            [2, 1], //julien
            [3, 2], //kevin
            [4, 3], //mmouky
            [5, 1], //pauline
            [6, 2.5], //francois
            [7, 1.5], //louis
            [8, 1], //remi
            [9, 1], //benji
            [10, 1.5] //erwann
        ];

        function random(taille) {
            return Math.floor(Math.random() * taille);
        }

       function makeTeam(){

            var hasTeam = [11,11,11,11,11,11,11,11,11,11,11];

            var equipe = [
                [11,11,11,11],
                [11,11,11,11],
                [11,11,11,12]
            ];

           var indexEquipe1 =0;
           var indexEquipe2 =0;
           var indexEquipe3 =0;

           function getRandom() {
               const index = random(10);
               Log.info(index);
               const teammember = member[index][0];

               return teammember;
           };

           function addRandomInTeam(){

               var randomGuy = getRandom();
               var chooseTeam = random(3);

               var hasRandomATeam = checkIfRandomHasTeam(randomGuy);

               Log.info("Le Random c'est : "+randomGuy);

               if(hasRandomATeam == 0 && isTeamFull(chooseTeam)==0){

                   Log.info("Intial HasTeam : "+hasTeam);
                   Log.info("Is Team Full :" +isTeamFull(chooseTeam));

                   if(chooseTeam == 0 && indexEquipe1 <4){

                       equipe[chooseTeam][indexEquipe1] = randomGuy;
                       hasTeam[randomGuy]= randomGuy;
                       indexEquipe1 = indexEquipe1+1;
                       Log.info('3. Index Equipe n°1 : '+indexEquipe1);

                   }
                   else if(chooseTeam == 1 && indexEquipe2 < 4){

                       equipe[chooseTeam][indexEquipe2] = randomGuy;
                       hasTeam[randomGuy]= randomGuy;
                       indexEquipe2 = indexEquipe2+1;
                       Log.info('4. Index Equipe n°2 : '+indexEquipe2);

                   }
                   else if(chooseTeam ==2 && indexEquipe3<3){

                       equipe[chooseTeam][indexEquipe3] = randomGuy;
                       hasTeam[randomGuy]= randomGuy;
                       indexEquipe3 = indexEquipe3+1;
                       Log.info('5. Index Equipe n°3 : '+indexEquipe3);

                   }
               }

               Log.info("1. HasTeam = " +hasTeam[randomGuy]);
               Log.info("2. Equipe =" +equipe);
           };

            function checkIfRandomHasTeam(randomGuy){ // 0 = pas d'eqipe , 1 = equipe
                var reponse = 0;
                    if(hasTeam[randomGuy] != 11){
                        reponse =1
                    }
                return reponse;
            };

            function isTeamFull(team) { // 0 = equipe pas pleine, 1 = equipeFull
                var reponse1 =0;
                for (i =0; i<4; i++) {
                    if (equipe[team][i] !== 11){
                        reponse1 = 0
                    }
                }
                return reponse1;
            };

            function execute() {
                var everyoneHaveATeam =0;

                while(everyoneHaveATeam !== 1){
                    var peopleThatHaveATeam = 0;
                    for(i=0;i<11;i++){
                        if (hasTeam[i] !== 11){
                            peopleThatHaveATeam++;
                            Log.info("peopleThatHaveATeam :" +peopleThatHaveATeam);
                        }
                        if (peopleThatHaveATeam !== 11){
                            everyoneHaveATeam = 0;
                            addRandomInTeam();
                            Log.info("everyoneHaveATeam ="+everyoneHaveATeam);
                            Log.info("Has Team :" +hasTeam);
                        }
                        else{
                            everyoneHaveATeam = 1;
                        }
                    }

                }
            };
            execute();
            return equipe;
       }

        Log.info(makeTeam());
    },
};

