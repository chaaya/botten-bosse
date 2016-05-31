module.exports = {
    exec: exec,
    description: 'Pongs the user back'
};

function exec(bot, message) {
    bot.reply(message, 'Pong!');
}
