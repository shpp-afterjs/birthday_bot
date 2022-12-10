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
		const userName = (ctx.message as Message.TextMessage).text.split(' ')[1].split('@')[1];
		if (users) {
			const userObject = users.find((item: User) => item[NICKNAME_TG] === userName);
			if (userObject) {
				const age = getCurrentAge(userObject[BIRTHDAY]);
				ctx.telegram.sendMessage(ctx.message!.chat.id, `${userObject[NICKNAME_TG]} is ${age} years old`);
			} else {
				ctx.telegram.sendMessage(ctx.message!.chat.id, 'There is no member with this username');
			}
		}
	} catch (error) {
		console.log(error);
	}
}
