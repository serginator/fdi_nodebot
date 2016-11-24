var TelegramBot = require('node-telegram-bot-api'),
    birthdays = require('./birthdays'),
    dotenv = require('dotenv').config({silent: true}),
    token = process.env.TELEGRAM_TOKEN,
    bot = new TelegramBot(token, { polling: true });

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

function help() {
    var msg = '';

    msg += 'Hola! Soy FDI Bot, y me encargo de felicitar cumpleaños.\n';
    msg += 'También me podéis dar alguna orden:\n\n';
    msg += '/ayuda: Este comando\n';
    msg += '/lista: Lista de cumpleaños\n';
    return msg;
}

setInterval(function() {
    var bdays = checkBirthdays(),
        msg;
    if ((new Date()).getHours() === 8) {
        if (bdays.length > 0) {
            if (bdays.length === 1) {
                msg = 'Es el cumpleaños de ' + bdays[0] + '. Felicidades!!!!';
            } else {
                msg = 'Es el cumpleaños de ' + bdays[0];
                for (var i = 1, n = bdays.length; i < n; i++) {
                    msg += ' y ' + bdays[i];
                }
                msg += '. Felicidades!!!!';
            }
            bot.sendMessage('-158674743', msg);
        }
    }
}, 1000 * 60 * 60);

// Matches "/lista"
bot.onText(/\/lista/, function (msg, match) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, getListOfBirthdays());
});

bot.onText(/\/ayuda/, function (msg, match) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, help());
});

console.log('Bot server started...');
