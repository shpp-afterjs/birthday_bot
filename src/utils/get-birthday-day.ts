import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import { RowItemNames } from '../enums/user.enum';

import getSticker from './get-sticker';
import getUserData from './get-user-data';

const { BIRTHDAY, NICKNAME_TG } = RowItemNames;

export async function getBirthdayDay(bot:Telegraf<Context<Update>>) {
	const now = new Date();
	const users = await getUserData();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	if (users) {
		for (let i = 0; i < users.length; i++) {
			const arrBirthday = users[i][BIRTHDAY].split('.');
			const userDay = new Date(`${now.getFullYear()},${arrBirthday[1]},${arrBirthday[0]}`);
			if (today.getTime() === userDay.getTime()) {
				bot.telegram.sendMessage(process.env.CHAT_ID as string, `@${users[i][NICKNAME_TG]} happy birthday!`);
				bot.telegram.sendSticker(process.env.CHAT_ID as string, getSticker());
			}
		}
	}
}
