import { Context } from 'telegraf';
import { Message } from 'typegram';

import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import getCurrentAge from '../utils/get-current-age';

const { BIRTHDAY, NICKNAME_TG } = RowItemNames;
export async function whoHasThisAge(ctx:Context) {
	try {
		const users = await fetchUserData();
		if (/\s+/.test((ctx.message as Message.TextMessage).text)) {
			const age = (ctx.message as Message.TextMessage).text.split(/\s+/)[1];
			if (users) {
				const sortedUsers = users.filter(((el: User) => getCurrentAge(el[BIRTHDAY]) === Number(age)));
				const messageString = sortedUsers.reduce((str: string, user: User) => (str += `${user[NICKNAME_TG]}\n`), '');
				const message = messageString ? messageString : 'There are no members with this age';
				ctx.telegram.sendMessage(ctx.message!.chat.id, message);
			}
		} else {
			ctx.telegram.sendMessage(ctx.message!.chat.id, 'Age is required');
		}
	} catch (error) {
		console.log(error);
	}
}
