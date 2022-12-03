import * as dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import { birthdaysList } from './commands/birthdaysList';
import { getFutureBirthdays } from './commands/get-future-birthdays';
import { getPastBirthdays } from './commands/get-past-birthdays';
import { getAge } from './commands/getAge';
import { whoHasThisAge } from './commands/whoHasThisAge';
import messages from './constants/messages';
import { getBirthdayDay } from './utils/get-birthday-day';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

bot.command('birthdayDay', async () => {
	getBirthdayDay(bot);
});
cron.schedule('*/2 * * * *', () => {
	getBirthdayDay(bot);
}, {
	scheduled: true,
	timezone: 'Europe/Kiev',
});
bot.command('getFutureBirthdays', async ctx => getFutureBirthdays(ctx));

bot.command('getPastBirthdays', async ctx => getPastBirthdays(ctx));

bot.command('birthdaysList', async ctx => birthdaysList(ctx));

bot.command('whoHasThisAge', async ctx => whoHasThisAge(ctx));

bot.command('getAge', async ctx => getAge(ctx));

bot.command('about', async ctx => ctx.reply(messages.ABOUT_MESSAGE));
bot.help(async ctx => ctx.reply(messages.HELP_MESSAGE));
bot.launch();
