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
const defaultTimeZoneMinute = momentTimeZone.tz("America/Recife").minutes(); // return number

const maxMinute = 59;
const minMinute = defaultTimeZoneMinute;
var paused = false;



console.log(defaultTimeZone + ' Recife')
console.log(typeof defaultTimeZone + ' Recife')
console.log(defaultTimeZoneMinute)
console.log(typeof defaultTimeZoneMinute)
console.log('----------------------------')

// logica de pausa do bot https://stackoverflow.com/questions/71315968/how-to-stop-and-restart-telegram-bot

bot.start(async (ctx, next) => {
    const from = ctx.update.message.from;
    await console.log(from);
    console.log(currentTime)
    ctx.reply(`Seja bem vindo, ${from.first_name}! No momento são ${currentTime} horas!`)
    getRandomBetEntry(minMinute, maxMinute);
    getRandomInterval(2, 3)
    next();
})



bot.on('text', async (ctx, next) => {
    let message = '';
    if(currentHour > 11 && currentHour < 18) {
        message = 'Boa tarde';
    } else if (currentHour >= 18 && currentHour <= 23) {
        message = 'Boa noite';
    } else {
        message = 'Bom dia';
    }
    await ctx.reply(message)
    next();
});

bot.on('text', async (ctx, next) => {
    await ctx.reply('*Analisar as rodadas anteriores pra saber se vai entrar 10 segundos antes ou 10 segundos depois.*\nSaque automático 1.5x \nMax 2x\n50% de saque ativado em 1.3x\n*Gerenciamento de banca, se perder a culpa não é minha!*\nVamos pra cima voadores\n🚀💜✅\nUser Detail:@72:29263:2926363:272-37264-39937')
});

bot.on('text', (ctx, next) => {
    ctx.reply('mid 3')
    next();
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.startPolling();

// Geracao de numero aleatorio

function getRandomBetEntry(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomBetEntry = 0;
    return  Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInterval(min, max) {
    var randomInterval = 3;
    randomInterval = Math.random() * (max - min) + min;
    return randomInterval = randomInterval * 1000;
}
