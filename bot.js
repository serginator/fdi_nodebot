var TelegramBot = require('node-telegram-bot-api'),
    birthdays = require('./birthdays'),
    dotenv = require('dotenv').config({silent: true}),
    token = process.env.TELEGRAM_TOKEN,
    bot = new TelegramBot(token, { polling: true }),
    count = 0,
    interval;

function checkBirthdays() {
    var date = new Date(),
        today = date.getDate() + '/' + (date.getMonth() + 1),
        bdays = [];
    for (var i in birthdays) {
        if (birthdays.hasOwnProperty(i)) {
            if (birthdays[i] === today) {
                bdays.push(i);
            }
        }
    }
    return bdays;
}

function getListOfBirthdays() {
    var msg = 'Lista de cumpleaños del canal.\nPara añadir alguno contactar con @serginator\n\n';
    msg += '////////////////////////////\n';
    for (var i in birthdays) {
        if (birthdays.hasOwnProperty(i)) {
            msg += i + ': ' + birthdays[i] + '\n';
        }
    }
    msg += '////////////////////////////\n';
    return msg;
}

function getNext() {
    var date = new Date(),
        dateTime = date.getTime(),
        nextDate = dateTime,
        msg = '',
        res;
    for (var i in birthdays) {
        if (birthdays.hasOwnProperty(i)) {
            var aux = birthdays[i].split('/'),
                dateAux = (new Date(date.getFullYear(), aux[1] - 1, aux[0])),
                dateAuxTime = dateAux.getTime();
            if ((dateAuxTime - dateTime) > 0 && (dateAuxTime - dateTime) < nextDate) {
                nextDate = dateAuxTime - dateTime;
                res = [i];
            } else if ((dateAuxTime - dateTime) === nextDate) {
                nextDate = dateAuxTime - dateTime;
                res.push(i);
            }
        }
    }
    if (res.length === 1) {
        msg += 'El próximo cumpleaños es el día ' + birthdays[res[0]] + ', de ' + res[0];
    } else {
        msg += 'El próximo cumpleaños es el día ' + birthdays[res[0]] + ', de ' + res[0];
        for (var i = 1, n = res.length; i < n; i++) {
            msg += ' y ' + res[i];
        }
    }

    return msg;
}

function help() {
    var msg = '';

    msg += 'Hola! Soy FDI Bot y me encargo de felicitar cumpleaños.\n';
    msg += 'También me podéis dar alguna orden:\n\n';
    msg += '/ayuda: Este comando\n';
    msg += '/lista: Lista de cumpleaños\n';
    msg += '/siguiente: Próximo cumpleaños\n';
    return msg;
}

(function clearAndSetInterval() {
    clearInterval(interval);
    count = 0;
    interval = setInterval(function() {
        var bdays = checkBirthdays(),
            msg;
        count++;
        if ((new Date()).getHours() === 8) {
            if (bdays.length > 0) {
                msg = 'Es el cumpleaños de ' + bdays[0];
                if (bdays.length > 1) {
                    for (var i = 1, n = bdays.length; i < n; i++) {
                        msg += ' y ' + bdays[i];
                    }
                }
                msg += '. Felicidades!!!!';
                bot.sendMessage(process.env.CHANNEL_ID, msg);
            }
        }
        if (count === 10) {
            clearAndSetInterval();
        }
    }, 1000 * 60 * 60);
})();

// Matches "/lista"
bot.onText(/\/lista/, function (msg, match) {
  var chatId = msg.chat.id;
  console.log('\'/lista\' command called by @' + msg.from.username);
  bot.sendMessage(chatId, getListOfBirthdays());
});

// Matches "/ayuda"
bot.onText(/\/ayuda/, function (msg, match) {
    var chatId = msg.chat.id;
    console.log('\'/ayuda\' command called by @' + msg.from.username);
    bot.sendMessage(chatId, help());
});

// Matches "/siguiente"
bot.onText(/\/siguiente/, function (msg, match) {
    var chatId = msg.chat.id;
    console.log('\'/siguiente\' command called by @' + msg.from.username);
    bot.sendMessage(chatId, getNext());
});

console.log('Bot server started...');
