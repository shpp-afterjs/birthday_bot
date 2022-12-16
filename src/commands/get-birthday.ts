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
			message = user
				? `There are ${daysToBirthdayLeft} days until @${user[NICKNAME_TG]} birthday! \n📍${user[BIRTHDAY]}`
				: 'There are no members with this username';
		}
	}

	ctx.telegram.sendMessage(ctx.message!.chat.id, message);
}
