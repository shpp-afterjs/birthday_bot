import { Context } from 'telegraf';
import { Message } from 'typegram';

import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import { getBirthdayDaysLeft } from '../utils/get-birthday-days-left';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;
export async function getBirthday(ctx:Context) {
	const users = await fetchUserData();
	let message = 'Nickname is required';

	if (/\s+/.test((ctx.message as Message.TextMessage).text)) {
		const userName = (ctx.message as Message.TextMessage).text.split(/\s+/)[1].split('@')[1];

		if (userName && users) {
			const user = users.find((item: User) => item[NICKNAME_TG] === userName);
			const daysToBirthdayLeft = await getBirthdayDaysLeft(user);

			if (user) {
				const userNickname: string = user[NICKNAME_TG].replace('@', '');
				const linkToUser: string = `<a href="t.me/${userNickname}">${userNickname}</a>`;

				message = `There are ${daysToBirthdayLeft} days until ${linkToUser} birthday! \n📍${user[BIRTHDAY]}`;
			} else {
				message = 'There are no members with this username';
			}
		}
	}

	ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'HTML' });
}
