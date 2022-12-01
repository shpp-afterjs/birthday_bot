import * as dotenv from 'dotenv';
dotenv.config();
import cron from 'node-cron';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import { User } from './interfaces/user.interface';
import getBirthdays from './utils/get-birthdays';
import getCurrentAge from './utils/get-current-age';
import getSticker from './utils/getSticker';
import texts from './utils/texts';
import getUserData from './utils/usersData';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

async function birthdayDay() {
	const now = new Date();
	const users:User[] = await getUserData();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	users.forEach(item => {
		const arr = item.birthday.split('.');
		const userDay = new Date(`${now.getFullYear()},${arr[1]},${arr[0]}`);
		if (today.getTime() === userDay.getTime()) {
			bot.telegram.sendMessage(process.env.CHAT_ID as string, `@${item.username} happy birthday!`);
			bot.telegram.sendSticker(process.env.CHAT_ID as string, getSticker());
		}
	});
}

bot.command('birthdayDay', async () => {
	birthdayDay();
});
cron.schedule('*/2 * * * *', () => {
	birthdayDay();
}, {
	scheduled: true,
	timezone: 'Europe/Kiev',
});
bot.command('birthdaysWillBe', async ctx => {
	const members = (await getBirthdays()).birthdaysWillBe;
	if (members) {
		ctx.telegram.sendMessage(ctx.message.chat.id, `Didn't have birthday this year yet:\n${members}`);
	} else {
		ctx.telegram.sendMessage(ctx.message.chat.id, 'There are no members who didn\'t have birthday yet');
	}
});

bot.command('birthdaysLeft', async ctx => {
	const members = (await getBirthdays()).birthdaysLeft;
	if (members) {
		ctx.telegram.sendMessage(ctx.message.chat.id, `Already had birthday this year:\n${members}`);
	} else {
		ctx.telegram.sendMessage(ctx.message.chat.id, 'There are no members who already had bithday thi year');
	}
});

bot.telegram.setMyCommands([
	{command: '/start', description: 'start bot'},
	{command: '/help', description: 'help command'},
	{command: '/about', description: 'about bot'},
	{command: '/team', description: 'about bot team'},
]);

bot.command('birthdaysList', async ctx => {
	const users: User[] = await getUserData();
	const str = users.reduce((str: string, user: User) => (str += `${user.username} - ${user.birthday}\n`), '');
	ctx.telegram.sendMessage(ctx.message.chat.id, str);
});

bot.command('whoHasThisAge', async ctx => {
	const users:User[] = await getUserData();
	const age = ctx.message.text.split(' ')[1];
	if (age) {
		const members = users.filter(((el: User) => getCurrentAge(el.birthday) === Number(age)));
		const string = members.reduce((str: string, user: User) => (str += `${user.username} `), '');
		ctx.telegram.sendMessage(ctx.message.chat.id, string || 'There are no members with this age');
	} else {
		ctx.telegram.sendMessage(ctx.message.chat.id, 'Invalid data');
	}
});

bot.command('getAge', async ctx => {
	const users: User[] = await getUserData();
	const userName = ctx.message.text.split(' ')[1].split('@')[1];
	const obj = users.find((item: User) => item.username === userName);
	if (obj) {
		const age = getCurrentAge(obj.birthday);
		ctx.telegram.sendMessage(ctx.message.chat.id, `${obj.username} is ${age} years old`);
	} else {
		ctx.telegram.sendMessage(ctx.message.chat.id, 'There is no member with this username');
	}
});
bot.start(async ctx => ctx.reply(texts.START_MESSAGE));
bot.command('about', async ctx => ctx.reply(texts.ABOUT_MESSAGE));
bot.command('team', async ctx => ctx.reply(texts.TEAM_MESSAGE));
bot.help(async ctx => ctx.reply(texts.HELP_MESSAGE));
bot.launch();
