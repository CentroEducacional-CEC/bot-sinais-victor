// const env = require('../.env');
const Telegraf = require('telegraf');
require('dotenv').config();
const token = process.env.token;
const bot = new Telegraf(token);
const moment = require('moment');
const momentTimeZone = require('moment-timezone');

// assert and refuse to start bot if token or webhookDomain is not passed
if (!token) throw new Error('"BOT_TOKEN" env var is required!');
// if (!webhookDomain) throw new Error('"WEBHOOK_DOMAIN" env var is required!');

// console.log(moment().format('HH:mm:ss'));
const currentHour = moment().hours();
const currentMinute = moment().minutes()
const currentTime = moment().format('HH:mm');
const defaultTimeZone = momentTimeZone.tz("America/Recife").format('HH:mm'); // return string
const defaultTimeZoneHour = momentTimeZone.tz("America/Recife").hour(); // return number
const defaultTimeZoneMinute = momentTimeZone.tz("America/Recife").minutes(); // return number

const maxMinute = 59;
const minMinute = defaultTimeZoneMinute;
var paused = false; // false == shutdown bot and true == turn on bot

// logica de pausa do bot https://stackoverflow.com/questions/71315968/how-to-stop-and-restart-telegram-bot

bot.start(async (ctx, next) => {
    // const from = ctx.update.message.from;
    // await console.log(from)  // Para falar com a pessoa que esta conversando com o bot
    ctx.reply(`Se preparem para os sinais! proximo sinal entre 3 a 5 minutos`)

    if ( paused == false) {
        function foo_interval_action() {
            let RedOrGreen = Math.random();
            console.log('red or green math random = ' + RedOrGreen)
            if (RedOrGreen < 0.7) {
                bot.telegram.sendMessage(process.env.TELEGRAM_CHANNEL, '🟣 APOSTE AGORA 🟣\n\n🚀 Saque Aut. em 1,5x / 2x*\n(50% Saque Aut. em 1,3x)\n\n🔄 Fazer no máx. G1\n\n(Recuperar dobrando a aposta)\n\n⏰ Entrar 10/15 segundos antes/depois\n\n(Analisar rodadas anteriores)\n⚠️ Gerenciamento de banca\n\n(Se perder a culpa não é minha!)\n\n✅GREEN');
                setTimeout(foo_interval_action,  getRandomInterval(3, 6) * 60000);
                console.log('GREEN aposte agora!' + currentTime)
            } else {
                bot.telegram.sendMessage(process.env.TELEGRAM_CHANNEL, '🟣 APOSTE AGORA 🟣\n\n🚀 Saque Aut. em 1,5x / 2x*\n(50% Saque Aut. em 1,3x)\n\n🔄 Fazer no máx. G1\n\n(Recuperar dobrando a aposta)\n\n⏰ Entrar 10/15 segundos antes/depois\n\n(Analisar rodadas anteriores)\n⚠️ Gerenciamento de banca\n\n(Se perder a culpa não é minha!)\n\n❌RED');
                setTimeout(foo_interval_action,  getRandomInterval(3, 6) * 6000);
                console.log('RED CUIDADO!') + currentTime
            }
        }
          setTimeout(foo_interval_action,  getRandomInterval(3, 6) * 60000);
        } else if (defaultTimeZoneHour >= 3 && defaultTimeZoneHour <= 10) {
        ctx.reply('🛑 Operações Pausadas! Retornaremos às 10 da manhã 🛑');
    }
    next();
});

bot.on('/stop', async (ctx, next) => {
    await ctx.reply('🛑 Operações Pausadas! 🛑');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.startPolling();

function getRandomInterval(min, max) {
    let randomInterval = Math.floor(Math.random() * (max - min) + min);
    console.log('randomInterval = ' + randomInterval + ' minutos')
    return randomInterval;
};

console.log(defaultTimeZone + ' Recife')
console.log(typeof defaultTimeZone + ' Recife')
console.log(defaultTimeZoneMinute)
console.log('----------------------------')