var _ = require('lodash');

module.exports = {
    exec: exec,
    description: 'Outputs all available commands'
};

function exec(bot, message) {
    var output = getCommandDescriptions();
    bot.sendMessage(message.channel, output);
}

function getCommandDescriptions() {
    var botCommands = require('./index.js');
    var output = 'This is the list of available commands:' + "\r\n\r\n";
    _.forEach(botCommands, function(value, key) {
        output += '!' + key + ' - ' + value.description + "\r\n";
    });

    return output;
}
