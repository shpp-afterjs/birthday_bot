require('dotenv').config()
const nodeFetch = require('node-fetch');
const { Telegraf } = require('telegraf')


async function getUsesrData(): Promise<void>{
    const resp = await nodeFetch(process.env.API_KEY)
    const data = await resp.json()
    return data
}


const bot = new Telegraf(process.env.BOT_TOKEN);


bot.telegram.setMyCommands([
    {command: "/start", description: 'start bot'},
    {command: "/help", description: 'help command'},
    {command: '/about', description: 'about bot'},
    {command: '/team', description: 'about bot team'}
]);
bot.start(async ctx => ctx.reply(process.env.START_MESSAGE));
bot.command('about', async ctx => await ctx.reply(process.env.ABOUT_MESSAGE));
bot.command('team', async ctx => await ctx.reply(process.env.TEAM_MESSAGE));
bot.help(async ctx => await ctx.reply(process.env.HELP_MESSAGE))
bot.launch()