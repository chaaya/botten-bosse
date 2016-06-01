var botCommands = require('./commands');
var Discord = require('discord.js');
var commandRegExpPattern = new RegExp('/(![a-z|A-Z])\w+/g');
var config = require('./config.json');
process.stdin.resume();
process.stdin.setEncoding('utf8');

var bot = new Discord.Client();
bot.loginWithToken(config.token);

bot.on('message', function(message) {
    readInput(message.content, bot, message);
});

process.stdin.on('data', function (text) {
    readInput(text);
});

function readInput(content, bot, message) {
    bot = getBot(bot);
    var command = parseCommand(content);
    if(command) {
        var args = [bot, message].concat(command.args);
        command.command.exec.apply(this, args);
    }
}

function getBot(bot) {
    if(bot) {
        return bot;
    } else {
        bot = {
            sendMessage: function(channel, content) {
                console.log(message);
            },
            reply: function(message, content) {
                console.log(content);
            }
        };
    }

    return bot;
}

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
            };
        }

        return null;
    }
}
