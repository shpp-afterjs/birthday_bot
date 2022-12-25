
import { Context } from 'telegraf';
import { Message } from 'typegram';

import zodiacs from '../constants/zodiaks';
import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import { zodiacSign } from '../utils/zodiac-sign';

const { NICKNAME_TG } = RowItemNames;

export async function getZodiac(ctx: Context) {
	try {
		const users = await fetchUserData();
		if (/\s+/.test((ctx.message as Message.TextMessage).text)) {
			const userName = (ctx.message as Message.TextMessage).text.split(/\s+/)[1].split('@')[1];
			if (users) {
				const userObject = users.find((item: User) => item[NICKNAME_TG] === userName);
				if (userObject) {
					const zodiac = zodiacSign(userObject);
					const message = `@${userName} is ${zodiac}${zodiacs[zodiac as keyof typeof zodiacs]}`;
					ctx.telegram.sendMessage(ctx.message!.chat.id, message);
				} else {
					ctx.telegram.sendMessage(ctx.message!.chat.id, `No data about @${userName}`);
				}
			}
		} else {
			ctx.telegram.sendMessage(ctx.message!.chat.id, 'Name is required');
		}
	} catch (error) {
		console.log(error);
	}
}

