import { Context } from 'telegraf';
import { Message } from 'typegram';

import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import getCurrentAge from '../utils/get-current-age';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;

export async function getAge(ctx: Context) {
	try {
		const users = await fetchUserData();
		if (/\s+/.test((ctx.message as Message.TextMessage).text)) {
			const userName = (ctx.message as Message.TextMessage).text.split(/\s+/)[1].split('@')[1];
			if (users) {
				const userObject = users.find((item: User) => item[NICKNAME_TG] === userName);
				if (userObject) {
					const age: number = getCurrentAge(userObject[BIRTHDAY]);

					const userNickname: string = userObject[NICKNAME_TG].replace('@', '');
					const linkToUser: string = `<a href="t.me/${userNickname}">${userNickname}</a>`;

					const message: string = userObject ? `${linkToUser} is ${age} years old` : 'There is no member with this username';

					await ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'HTML' });
				}
			}
		} else {
			ctx.telegram.sendMessage(ctx.message!.chat.id, 'Nickname is required', { parse_mode: 'HTML' });
		}
	} catch (error) {
		console.log('getAge: ', error);
	}
}
