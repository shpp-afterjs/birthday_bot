import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import { RowItemNames, User } from '../interfaces/user.interface';

import getSticker from './getSticker';
import getUserData from './usersData';

const {BIRTHDAY, NICKNAME_TG} = RowItemNames;

export async function getBirthdayDay(bot:Telegraf<Context<Update>>) {
	const now = new Date();
	const users:User[] | undefined = await getUserData();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	users!.forEach((item: User) => {
		const arr = item[BIRTHDAY].split('.');
		const userDay = new Date(`${now.getFullYear()},${arr[1]},${arr[0]}`);
		if (today.getTime() === userDay.getTime()) {
			bot.telegram.sendMessage(process.env.CHAT_ID as string, `@${item[NICKNAME_TG]} happy birthday!`);
			bot.telegram.sendSticker(process.env.CHAT_ID as string, getSticker());
		}
	});
}
