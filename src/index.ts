import * as dotenv from 'dotenv'
dotenv.config()
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import fetchNode from 'node-fetch';
import getCurrentAge from './utils/age';

interface user {
    username: string,
    firstName: string,
    birthday: string,
}

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);


async function getUsesrData(): Promise<any> {
    const resp= await fetchNode(process.env.API_KEY as string)
    const data = await  resp.json()
    return data
}

bot.telegram.setMyCommands([
    {command: "/start", description: 'start bot'},
    {command: "/help", description: 'help command'},
    {command: '/about', description: 'about bot'},
    {command: '/team', description: 'about bot team'}
]);
bot.start(async (ctx) => ctx.reply(process.env.START_MESSAGE as string));

bot.command('birthdaysList', async (ctx) => {
    const users: user[] = await getUsesrData();
    const str = users.reduce((str: string, user: any) => str +=`${user.username} - ${user.birthday}\n`, '');
    ctx.telegram.sendMessage(ctx.message.chat.id, str)

});

bot.command('whoHasThisAge', async (ctx) => {
    const users:user[]= await getUsesrData();
    const age = ctx.message.text.split(' ')[1]
    const members = users.filter(((el: user) => getCurrentAge(el.birthday) === +age))
    const string = members.reduce((str: string, user: user) => str +=`${user.username} `, '');
    ctx.telegram.sendMessage(ctx.message.chat.id, string || 'There are no members with this age')
});

bot.command('getAge', async (ctx) => {
        const users: user[] = await getUsesrData();
        const userName = ctx.message.text.split(' ')[1].split('@')[1];
        const obj = users.find((item: user) => item.username === userName)
        if(obj){
            const age = getCurrentAge(obj.birthday)
            ctx.telegram.sendMessage(ctx.message.chat.id, `${obj.username} is ${age} years old`)
        }else {
            ctx.telegram.sendMessage(ctx.message.chat.id, 'There is no member with this username')
        }
})
bot.command('about', async (ctx) => ctx.reply(process.env.ABOUT_MESSAGE as string));
bot.command('team', async (ctx) => ctx.reply(process.env.TEAM_MESSAGE as string));
bot.help(async (ctx) => ctx.reply(process.env.HELP_MESSAGE as string))
bot.launch()
