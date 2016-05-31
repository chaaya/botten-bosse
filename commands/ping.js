module.exports = {
    exec: exec,
    description: 'Pongs the user back'
};

function exec(bot, message, p1, p2) {
    bot.reply(message, 'Pong! ' + p1 + p2);
}
