import * as dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';
import { Context, Telegraf } from 'telegraf';
import { InlineQueryResult, Update } from 'typegram';

import about from './commands/about';
import { getAge } from './commands/get-age';
import { getBirthday } from './commands/get-birthday';
import { getBirthdaysList } from './commands/get-birthdays-list';
import { getFutureBirthdays } from './commands/get-future-birthdays';
import { getPastBirthdays } from './commands/get-past-birthdays';
import help from './commands/help';
import { replyFuncWithAction } from './commands/reply-func-with-action';
import start from './commands/start';
import { whoHasThisAge } from './commands/who-has-this-age';
import BOT_COMMANDS from './constants/bot-commands';
import INLINE_QUERY from './constants/inline-query';
import typingTime from './constants/time';
import { getBirthdayDay } from './utils/get-birthday-day';
import team from './utils/inline-query/team';

const Bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

console.log('connected');

cron.schedule('0 9 * * *', () => {
	getBirthdayDay(Bot);
}, {
	scheduled: true,
	timezone: 'Europe/Kiev',
});

Bot.telegram.setMyCommands(BOT_COMMANDS);

Bot.inlineQuery('team', ctx => ctx.answerInlineQuery(team((INLINE_QUERY.team)) as InlineQueryResult[]));

Bot.command('future_birthdays', async ctx => replyFuncWithAction(getFutureBirthdays, ctx, typingTime));

Bot.command('past_birthdays', async ctx => replyFuncWithAction(getPastBirthdays, ctx, typingTime));

Bot.command('birthdays', async ctx => replyFuncWithAction(getBirthdaysList, ctx, typingTime));

Bot.command('get_birthday', async ctx => replyFuncWithAction(getBirthday, ctx, typingTime));

Bot.command('who_has_this_age', async ctx => replyFuncWithAction(whoHasThisAge, ctx, typingTime));

Bot.command('get_age', async ctx => replyFuncWithAction(getAge, ctx, typingTime));

Bot.command('about', async ctx => replyFuncWithAction(about, ctx, typingTime));
Bot.help(async ctx => replyFuncWithAction(help, ctx, typingTime));
Bot.start(async ctx => replyFuncWithAction(start, ctx, typingTime));

Bot.launch();

