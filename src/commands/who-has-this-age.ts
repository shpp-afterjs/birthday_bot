import { Context } from 'telegraf';
import { Message } from 'typegram';

import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import getCurrentAge from '../utils/get-current-age';

const { BIRTHDAY, NICKNAME_TG } = RowItemNames;
export async function whoHasThisAge(ctx: Context) {
	try {
		const users = await fetchUserData();
		let message = 'Age is required';

		if (/\s+/.test((ctx.message as Message.TextMessage).text)) {
			const age = (ctx.message as Message.TextMessage).text.split(/\s+/)[1];
			if (users) {
				const sortedUsers = users.filter(((el: User) => getCurrentAge(el[BIRTHDAY]) === Number(age)));

				const messageString = sortedUsers.reduce((str: string, user: User) => {
					const nickname: string = user[NICKNAME_TG].replace('@', '');
					const linkToUser: string = `<a href="t.me/${nickname}">${nickname}</a>`;

					return (str += `${linkToUser} \n`);
				}, '');

				message = messageString ? messageString : 'There are no members with this age';
			}
		}

		await ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'HTML' });
	} catch (error) {
		console.log('whoHasThisAge: ', error);
	}
}
