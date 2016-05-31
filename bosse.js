var botCommands = require('./commands');
var Discord = require('discord.js');
var commandRegExpPattern = new RegExp('/(![a-z|A-Z])\w+/g');
var config = require('./config.json');

var bot = new Discord.Client();
bot.loginWithToken(config.token);

bot.on('message', function(message) {
    var command = parseCommand(message.content);
    if(command) {
        var args = [bot, message].concat(command.args);        
        command.command.exec.apply(this, args);
    }
            
});

function parseCommand(input) {
    var m = input.match(/^!([a-zA-Z]+)\s*(.*)/);    
    if(m) {        
        var commandName = m[1];
        var args = m[2].split(' ');
        var command = botCommands[commandName];        
        if(command && command.exec) {            
            return {
                command: command,
                args: args
            }
        }
        
        return null;
    }
}
