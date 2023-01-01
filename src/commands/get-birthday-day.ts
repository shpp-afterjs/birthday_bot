
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

import stickers from '../constants/stickers';
import { RowItemNames } from '../enums/user.enum';
import fetchUserData from '../utils/fetch-user-data';
import getRandomSticker from '../utils/get-randomSticker';

const { BIRTHDAY, NICKNAME_TG } = RowItemNames;

export async function getBirthdayDay(bot:Telegraf<Context<Update>>) {
	const now = new Date();
	const users = await fetchUserData();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	let birthdayUser = null;
	if (users) {
		for (let i = 0; i < users.length; i++) {
			const arrBirthday = users[i][BIRTHDAY].split('.');
			const userDay = new Date(`${now.getFullYear()},${arrBirthday[1]},${arrBirthday[0]}`);
			if (today.getTime() === userDay.getTime()) {
				birthdayUser = users[i];
			}
		}

		if (birthdayUser) {
			bot.telegram.sendMessage(process.env.CHAT_ID as string, `@${birthdayUser[NICKNAME_TG]} happy birthday!`);
			bot.telegram.sendSticker(process.env.CHAT_ID as string, getRandomSticker(stickers));
		}
	}
}
