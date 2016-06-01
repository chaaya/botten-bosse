var config = require('../config.json');
var fetch = require('node-fetch');

module.exports = {
    exec: exec,
    description: 'Gets xkcd-comics'
};

function exec(bot, message, number) {
    //bot.reply(message, 'Wait while I am getting the weather info for ' + city + '...');
    var promise = xkcd(number);

    if (promise) {
        promise.then(function (json) {
            var answer = getAnswer(json);
            console.log("Bot got answer: ", answer);
            bot.sendMessage(message.channel, answer);
        })
            .catch(function (error) {
                bot.reply(message, 'Couldnt get that info for you sir, sorry :(');
            });
    } else {
        bot.reply(message,
            "\r\nXKCD - Commands\r\n" +
            "!xkcd (will get daily XKCD)\r\n" +
            "!xkcd # (will get XKCD with number #)\r\n" +
            "!xkcd rand (will get a random XKCD)");
    }
}

function xkcd(input) {

    var isNumber = input && !isNaN(parseInt(input));
    var isRandom = input === "rand";
    var isEmpty = !input;

    if (isNumber) { return getXkcdNumber(input) }
    if (isRandom) { return getXkcdRandom(input) }
    if (isEmpty) { return getXkcdEmpty(input) }
}

function getXkcdEmpty(number) {
    var url = "http://xkcd.com/info.0.json";
    var promise = getXkcdBase(url);
    return promise;
}

function getXkcdNumber(number) {
    var url = "http://xkcd.com/" + number + "/info.0.json";
    var promise = getXkcdBase(url);
    return promise;
}

function getXkcdRandom() {
    var url = "http://xkcd.com/info.0.json";
    var promise = getXkcdBase(url).then(function (json) {
        var min = 1;
        var max = json.num;
        var rnd = getRandomInt(min, max);
        return getXkcdBase("http://xkcd.com/" + rnd + "/info.0.json");
    });

    return promise;
}

function getXkcdBase(url) {
    console.log("Getting XKCD from: ", url);
    var promise = fetch(url)
        .then(function (res) {
            var json = res.json();
            console.log("Result: ", json);
            return json;
        });


    return promise;
}

function getAnswer(json) {
    var answer = json.title + "\r\n" +
        json.img + "\r\n" +
        json.alt;
    return answer;
}

// http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
