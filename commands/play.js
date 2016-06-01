module.exports = {
    exec: exec,
    description: 'Notify all that that you are looking for players for the current game you are playing.'
};

function exec(bot, message) {
    if(message.author.game && message.author.game.name) {
        var output = '@here Anyone want to play ' + message.author.game.name + ' with ' + message.author.username + '?'
        bot.sendMessage(message.channel, output);
    }
}
