module.exports = {
    name: "g",
    permissions: {
        "*": "*"
    },
    execute: function (message) {
        let GphApiClient = require('giphy-js-sdk-core');
        let appGiphy = GphApiClient("FuRdX8nlJDb81vkld04pvDqGS4mg4pl9");
        const parse = message.content.split(/ +/);
        const type = parse[1];
        const param = parse[2];
        var stockage = [];
        var i = 0;

        let getRandomInt = function () {
            return Math.floor(Math.random() * 100);
        };

        if (type === "s" || "search") {
            Log.info("Search");
            appGiphy.search('gifs', {"q": parse, "limit": "100"})
                .then((response) => {
                    response.data.forEach((gifObject) => {
                        stockage[i] = gifObject.url;
                        i++;
                    });
                    message.channel.send(stockage[getRandomInt()])
                })
                .catch((err) => {
                });
        } else if (type === "t" || "trending" || "tendance") {
            appGiphy.trending('gifs', {"limit": "100"})
                .then((response) => {
                    response.data.forEach((gifObject) => {
                        stockage[i] = gifObject.url;
                        i++;
                    })
                    message.channel.send(stockage[getRandomInt()]);
                })
                .catch((err) => {
                });
        } else if (type === "r" || "random") {
            appGiphy.random('gifs')
                .then((response) => {
                    response.data.forEach((gifObject) => {
                        message.channel.send(gifObject.url);
                    })
                })
                .catch((err) => {
                });
        }
        stockage = [];
        Log.success("La commande Giphy a été effectuée avec succes");
    }
};