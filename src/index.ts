import * as dotenv from 'dotenv'
dotenv.config()
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import fetchNode from 'node-fetch';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);


async function getUsesrData(): Promise<any> {
    const resp= await fetchNode(process.env.API_KEY as string)
    const data = await  resp.json()
    return data

}
getUsesrData()

bot.telegram.setMyCommands([
    {command: "/start", description: 'start bot'},
    {command: "/help", description: 'help command'},
    {command: '/about', description: 'about bot'},
    {command: '/team', description: 'about bot team'}
]);
bot.start(async (ctx) => ctx.reply(process.env.START_MESSAGE as string));

bot.hears('/birthdaysList', async (ctx) => {
    const users: [] = await getUsesrData();
    let str =   ''
    users.forEach((element: any) => {
        str += `${element.username} - ${element.birthday}\n`
    });
    ctx.telegram.sendMessage(ctx.message.chat.id, str)


});
bot.command('about', async (ctx) => ctx.reply(process.env.ABOUT_MESSAGE as string));
bot.command('team', async (ctx) => ctx.reply(process.env.TEAM_MESSAGE as string));
bot.help(async (ctx) => ctx.reply(process.env.HELP_MESSAGE as string))
bot.launch()
