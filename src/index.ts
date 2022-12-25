import * as dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import about from './commands/about';
import { getAge } from './commands/get-age';
import { getBirthday } from './commands/get-birthday';
import { getBirthdaysList } from './commands/get-birthdays-list';
import { getFutureBirthdays } from './commands/get-future-birthdays';
import { getPastBirthdays } from './commands/get-past-birthdays';
import help from './commands/help';
import { replyFuncWithAction } from './commands/reply-func-with-action';
import { whoHasThisAge } from './commands/who-has-this-age';
import typingTime from './constants/time';
import { getBirthdayDay } from './utils/get-birthday-day';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

cron.schedule('0 9 * * *', () => {
	getBirthdayDay(bot);
}, {
	scheduled: true,
	timezone: 'Europe/Kiev',
});

bot.telegram.setMyCommands([
	{ command: '/help', description: 'help command' },
	{ command: '/about', description: 'about bot' },
]);
bot.command('futureBirthdays', async ctx => replyFuncWithAction(getFutureBirthdays, ctx, typingTime));

bot.command('pastBirthdays', async ctx => replyFuncWithAction(getPastBirthdays, ctx, typingTime));

bot.command('birthdays', async ctx => replyFuncWithAction(getBirthdaysList, ctx, typingTime));

bot.command('getBirthday', async ctx => replyFuncWithAction(getBirthday, ctx, typingTime));

bot.command('whoHasThisAge', async ctx => replyFuncWithAction(whoHasThisAge, ctx, typingTime));

bot.command('getAge', async ctx => replyFuncWithAction(getAge, ctx, typingTime));

bot.command('about', async ctx => replyFuncWithAction(about, ctx, typingTime));
bot.help(async ctx => replyFuncWithAction(help, ctx, typingTime));

bot.launch();

