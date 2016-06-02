// !pickup start csgo <teams:optional>
// !pickup join csgo - needs validation so that the same user cant join twice.
// !pickup end csgo - a command for dispanding a pickup. can only be executed by the creator.
var _ = require('lodash');

var pickups = {

};


//team sized depending on game
var games = {
    overwatch: 6,
    csgo: 5,
    lol: 5,
    csgo2on2: 2
};


function exec(bot, message, command, game, teams) {
    var pickupId = message.channel + '_' + game;
    switch (command) {
        case 'start':
            start(bot, message, game, teams, pickupId);
            break;
        case 'join':
            join(bot, message, game, pickupId);
            break;
        default:
            bot.reply(message, 'Unrecognizeable !pickup command: ' + command);
    }
}

function start(bot, message, game, teams, pickupId) {
    if(!games[game]) {
        var gameTitles = _.keysIn(games);
        bot.reply(message, 'Unrecognizeable !pickup start <game>. These games are supported ' + gameTitles.join(', ') + '.');
    }
    if(pickups[pickupId]) {
        bot.reply(message, 'Their is already a pickup started for ' + game + ' in this channel. To join that pickup type !pickup join ' + game);
    } else {
        var slots = teams ? games[game] * 2 : games[game];
        var isMixedTeams = teams ? true : false;
        pickups[pickupId] = {
            game: game,
            isMixedTeams: isMixedTeams,
            slots: slots,
            players: [
                {
                    username: message.author.username,
                    isCreator: true
                }
            ]
        };

        bot.sendMessage(message.channel, '@here Pickup started for ' + game + '. To join that pickup type !pickup join ' + game + '.');
        console.log('pickups in system', pickups);
        console.log('user', message.author.username);
    }
}

function join(bot, message, game, pickupId) {
    if(!pickups[pickupId]) {
        bot.reply(message, 'Their isnt a pickup started for ' + game + ' in this channel. To start a pickup type !pickup start ' + game + ' <teams> (optional if you want to create two teams)');
    } else {
        pickups[pickupId].players.push(
            {
                username: message.author.username,
                isCreator: false
            }
        );

        if(_.size(pickups[pickupId].players) === pickups[pickupId].slots) {
            var pickupMessage = ''
            if(pickups[pickupId].isMixedTeams) {
                var mixedTeams = mixTeams(pickups[pickupId].players, games[pickups[pickupId].game]);
                pickupMessage = '@here Pickup completed for ' + pickups[pickupId].game + '. The teams are => \r\n\r\n'
                pickupMessage += 'Team1: ' + mixedTeams.team1.join(', ') + '\r\n';
                pickupMessage += 'Team2: ' + mixedTeams.team2.join(', ');
            } else {
                var players = _.map(pickups[pickupId].players, 'username');
                pickupMessage = '@here Pickup completed for ' + pickups[pickupId].game + '. Enjoy your game ' + players.join(', ');
            }

            bot.sendMessage(message.channel, pickupMessage);
        }
    }
}

function mixTeams(players, teamSize) {

    var teams = {
        1: [],
        2: []
    };

    _.forEach(players, function(player) {
        var team2join = _.random(1, 2);
        if(_.size(teams[team2join.toString()]) !== teamSize) {
            teams[team2join.toString()].push(player.username);
        } else {
            teams[team2join === 1 ? '2' : '1'].push(player.username);
        }
    });

    return teams;
}

module.exports = {
    exec: exec,
    description: 'Creates a pickup group with one our two teams. !pickup start <csgo|overwatch|lol> <teams> (optional, creates two random teams from the pickup group)'
};
