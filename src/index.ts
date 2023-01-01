import * as dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import { getAge } from './commands/get-age';
import { getBirthday } from './commands/get-birthday';
import { getBirthdaysList } from './commands/get-birthdays-list';
import { getFutureBirthdays } from './commands/get-future-birthdays';
import { getPastBirthdays } from './commands/get-past-birthdays';
import { getZodiac } from './commands/get-zodiac';
import { whoHasThisAge } from './commands/who-has-this-age';
import messages from './constants/messages';
import { getBirthdayDay } from './commands/get-birthday-day';

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
bot.command('futureBirthdays', async ctx => getFutureBirthdays(ctx));

bot.command('pastBirthdays', async ctx => getPastBirthdays(ctx));

bot.command('birthdays', async ctx => getBirthdaysList(ctx));

bot.command('getBirthday', async ctx => getBirthday(ctx));

bot.command('whoHasThisAge', async ctx => whoHasThisAge(ctx));

bot.command('getAge', async ctx => getAge(ctx));

bot.command('getZodiac', async ctx => getZodiac(ctx));

bot.command('about', async ctx => ctx.reply(messages.ABOUT_MESSAGE));
bot.help(async ctx => ctx.reply(messages.HELP_MESSAGE));

bot.launch();

