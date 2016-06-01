var config = require('../config.json');
var fetch = require('node-fetch');

module.exports = {
    exec: exec,
    description: 'Shows the current weather for supplied city, only supports swedish citys.'
};

function exec(bot, message, city) {
    bot.reply(message, 'Wait while I am getting the weather info for ' + city + '...');
    getWeather(city)
        .then(function(answer) {
            bot.reply(message, answer);
        })
        .catch(function(error) {
            bot.reply(message, 'Couldnt get that info for you sir, sorry :(');
        });

}

function getWeather(city) {
    var promise = fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',SE&units=metric&APPID=' + config.openweathermap)
                	.then(function(res) {
                		return res.json();
                	})
                    .then(function(json) {
                		var answer = 'The weather is currently described as ' + json.weather[0].description + ' and its ' + json.main.temp + ' °C outside.';
                        return answer;
                	});

    return promise;
}
