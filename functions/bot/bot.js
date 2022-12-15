const Telegraf = require('telegraf');
require('dotenv').config();
const token = process.env.token;
const bot = new Telegraf(token);
// bot.telegram.deleteWebhook();
const moment = require('moment');
const momentTimeZone = require('moment-timezone');

// assert and refuse to start bot if token or webhookDomain is not passed
if (!token) throw new Error('"BOT_TOKEN" env var is required!');
// if (!webhookDomain) throw new Error('"WEBHOOK_DOMAIN" env var is required!');

var currentTime = moment().format('HH:mm');
var defaultTimeZone = momentTimeZone.tz("America/Recife").format('HH:mm'); // return string
var defaultTimeZoneHour = momentTimeZone.tz("America/Recife").hour(); // return number
var defaultTimeZoneMinute = momentTimeZone.tz("America/Recife").minutes(); // return number

function timezoneRecifeFormated() {
    return momentTimeZone.tz("America/Recife").format('HH:mm');
}

function timezoneRecifeHour() {
    return momentTimeZone.tz("America/Recife").hour();
}

var pauseBot = false;

const minimumRangeMinute = 3;
const maxRangeMinute = 6;

bot.start(async (ctx, next) => {
    ctx.reply(`🟢Bot online! Próximo sinal em aproximadamente 3 a 5 minutos\n\n ⚠OBS: Caso estejamos entre 3h da manhã e 8h da manhã o bot só enviará os primeiros sinais a partir das 8h da manhã\n\n⏸Para pausar o bot, digite: /stopbet`);

    pauseBot = false;
    
    function foo_interval_action() {
        if (pauseBot == false) {
            let RedOrGreen = Math.random();
            
            let onlinePeriod = timezoneRecifeHour() > 7 || timezoneRecifeHour() < 3;
            let offlinePeriod = timezoneRecifeHour() >= 15 && timezoneRecifeHour() < 17
            
            console.log('red or green math random = ' + RedOrGreen);
            console.log('-----------')
            console.log('ONline period = ' + onlinePeriod);
            console.log('-----------')
            console.log('OFFline period = ' + offlinePeriod);
                
                if (RedOrGreen < 0.7 && !onlinePeriod) {
                    bot.telegram.sendMessage(process.env.TELEGRAM_CHANNEL, '🟣 APOSTE AGORA 🟣\n\n🚀 Saque Aut. em 1,5x / 2x*\n(50% Saque Aut. em 1,3x)\n\n🔄 Fazer no máx. G1\n\n(Recuperar dobrando a aposta)\n\n⏰ Entrar 10/15 segundos antes/depois\n\n(Analisar rodadas anteriores)\n⚠️ Gerenciamento de banca\n\n(Se perder a culpa não é minha!)');
                    setTimeout(foo_interval_action,  getRandomInterval(minimumRangeMinute, maxRangeMinute));
                    console.log('GREEN aposte agora!' + timezoneRecifeFormated());
                } else if (RedOrGreen >= 0.7 && !onlinePeriod) {
                    bot.telegram.sendMessage(process.env.TELEGRAM_CHANNEL, '🟣 APOSTE AGORA 🟣\n\n🚀 Saque Aut. em 1,5x / 2x*\n(50% Saque Aut. em 1,3x)\n\n🔄 Fazer no máx. G1\n\n(Recuperar dobrando a aposta)\n\n⏰ Entrar 10/15 segundos antes/depois\n\n(Analisar rodadas anteriores)\n⚠️ Gerenciamento de banca\n\n(Se perder a culpa não é minha!)');
                    setTimeout(foo_interval_action,  getRandomInterval(minimumRangeMinute, maxRangeMinute));
                    console.log(('RED CUIDADO!') + timezoneRecifeFormated());
                }
                else {
                    setTimeout(foo_interval_action,  getRandomInterval(minimumRangeMinute, maxRangeMinute));
                    console.log('Bot offline, fora do periodo de trabalho. Agora são ' + timezoneRecifeFormated());
                }
        }   
    }

    setTimeout(foo_interval_action,  getRandomInterval(minimumRangeMinute, maxRangeMinute));

    next();
});

bot.command('stopbet', (ctx) => { // Para pausar o bot use o comando /stopbet
    pauseBot = true;
    ctx.reply('⛔BOT PAUSADO❗ \n\n Para iniciar o bot novamente digite: /start');
    console.log('Bot pausado manualmente pelo usuário.');
    return
})

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.startPolling();

function getRandomInterval(min, max) {
    let randomInterval = Math.floor(Math.random() * (max - min) + min); // Not include the max value
    console.log('randomInterval = Daqui a ' + randomInterval + ' minutos. TimeZone Recife AGORA = ' + timezoneRecifeFormated());
    return randomInterval * 1000;
};

// console.log(typeof defaultTimeZone + ' Recife')
// console.log(defaultTimeZoneMinute)
console.log(defaultTimeZone + ' Recife')
console.log('Hora: ' + defaultTimeZoneHour)
console.log('Tipo do dado Hora é um: ' + typeof defaultTimeZoneHour)
console.log('----------------------------')

// exports.handler = async event => {
//     try {
//         await bot.handleUpdate(JSON.parse(event.body))
//         return { statusCode: 200, body: "" }
//     } catch (e) {
//         console.error("error in handler:", e)
//         return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
//     }
// }