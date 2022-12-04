import { Context} from 'telegraf';
import {Message } from 'typegram';

import { RowItemNames, User } from '../interfaces/user.interface';
import getCurrentAge from '../utils/get-current-age';
import getUserData from '../utils/usersData';

const {NICKNAME_TG, BIRTHDAY} = RowItemNames;

export async function getAge(ctx: Context) {
	try {
		const users: User[] | undefined = await getUserData();
		const userName = (ctx.message as Message.TextMessage).text.split(' ')[1].split('@')[1];
		const obj = users!.find((item: User) => item[NICKNAME_TG] === userName);
		if (obj) {
			const age = getCurrentAge(obj[BIRTHDAY]);
			ctx.telegram.sendMessage(ctx.message!.chat.id, `${obj[NICKNAME_TG]} is ${age} years old`);
		} else {
			ctx.telegram.sendMessage(ctx.message!.chat.id, 'There is no member with this username');
		}
	} catch (error) {
		console.log(error);
	}
}
