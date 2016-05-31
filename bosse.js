var botCommands = require('./commands');
var Discord = require('discord.js');
var commandRegExpPattern = new RegExp('/(![a-z|A-Z])\w+/g');

var bot = new Discord.Client();
bot.loginWithToken('token');

bot.on('message', function(message) {
    var command = getCommand(message.content);
    if(command && command.exec) {
        command.exec(bot, message);
    }
});


function getCommand(messageContent) {
    var commandName = messageContent.match(/(^![a-zA-Z]+)\s*(.*)/);
    if(commandName) {
        var commandKey = commandName[0];
        if(botCommands[commandKey]) {
            return botCommands[commandKey];
        }
    }

    return null;
}
