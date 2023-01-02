/* eslint-disable no-mixed-spaces-and-tabs */
import * as dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import { getAge } from '../../src/commands/get-age';
import { getBirthday } from '../../src/commands/get-birthday';
import { getBirthdayDay } from '../../src/commands/get-birthday-day';
import { getBirthdaysList } from '../../src/commands/get-birthdays-list';
import { getFutureBirthdays } from '../../src/commands/get-future-birthdays';
import { getPastBirthdays } from '../../src/commands/get-past-birthdays';
import { getZodiac } from '../../src/commands/get-zodiac';
import { whoHasThisAge } from '../../src/commands/who-has-this-age';
import messages from '../../src/constants/messages';

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

exports.handler = async (event: { body: string; }) => {
	try {
	  await bot.handleUpdate(JSON.parse(event.body));
	  return { statusCode: 200, body: '' };
	} catch (e) {
	  console.error('error in handler:', e);
	  return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
	}
};
