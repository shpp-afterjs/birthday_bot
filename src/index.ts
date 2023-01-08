import * as dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';
import { Context, Telegraf } from 'telegraf';
import {
	InlineQueryResult,
	Update,
} from 'telegraf/typings/core/types/typegram';

import handleCommand from './commands/handle-command';
import getAbout from './commands/main/get-about';
import { getAge } from './commands/main/get-age';
import { getBirthday } from './commands/main/get-birthday';
import { getBirthdayDay } from './commands/main/get-birthday-day';
import { getBirthdaysList } from './commands/main/get-birthdays-list';
import { getFutureBirthdays } from './commands/main/get-future-birthdays';
import getHelp from './commands/main/get-help';
import { getPastBirthdays } from './commands/main/get-past-birthdays';
import getStart from './commands/main/get-start';
import { getZodiac } from './commands/main/get-zodiac';
import getCallbackKeyboard from './commands/main/keyboards/callback/get-callback-keyboard';
import getInlineKeyboard from './commands/main/keyboards/inline/get-inline-keyboard';
import removeKeyboards from './commands/main/keyboards/remove-keyboards';
import { whoHasThisAge } from './commands/main/who-has-this-age';
import commandsList from './constants/command-list';
import teamList from './constants/inline-mode/teamList';
import getTeamList from './utils/inline-mode/get-team-list';

const bot: Telegraf<Context<Update>> = new Telegraf(
	process.env.BOT_TOKEN as string,
);

cron.schedule(
	'0 9 * * *',
	() => {
		getBirthdayDay(bot);
	},
	{
		scheduled: true,
		timezone: 'Europe/Kiev',
	},
);

bot.telegram.setMyCommands(commandsList);

console.log('bot has launched.');

bot.inlineQuery('team', ctx =>
	ctx.answerInlineQuery(getTeamList(teamList) as Readonly<InlineQueryResult[]>),
);

handleCommand({
	Bot: bot,
	commandName: 'future_birthdays',
	func: getFutureBirthdays,
});
handleCommand({
	Bot: bot,
	commandName: 'past_birthdays',
	func: getPastBirthdays,
});
handleCommand({ Bot: bot, commandName: 'birthdays', func: getBirthdaysList });

handleCommand({ Bot: bot, commandName: 'get_birthday', func: getBirthday });
handleCommand({ Bot: bot, commandName: 'get_age', func: getAge });
handleCommand({
	Bot: bot,
	commandName: 'who_has_this_age',
	func: whoHasThisAge,
});
handleCommand({ Bot: bot, commandName: 'get_zodiac', func: getZodiac });

handleCommand({ Bot: bot, commandName: 'start', func: getStart });
handleCommand({ Bot: bot, commandName: 'help', func: getHelp });
handleCommand({ Bot: bot, commandName: 'about', func: getAbout });

handleCommand({
	Bot: bot,
	commandName: 'inline_keyboard',
	func: getInlineKeyboard,
});
bot.command('callback_keyboard', ctx => getCallbackKeyboard(ctx));

removeKeyboards(bot);

bot.launch();
