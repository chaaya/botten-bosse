module.exports = {
    exec: exec,
    description: 'Pongs the user back'
};

function exec(bot, message, config, p1) {
    bot.reply(message, 'Pong!');
}
