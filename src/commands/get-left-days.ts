import { Context } from 'telegraf';
import { Message } from 'typegram';

import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import { getBirthdayDaysLeft } from '../utils/get-birthday-days-left';

const { NICKNAME_TG } = RowItemNames;
export async function getLeftDays(ctx:Context) {
	const users = await fetchUserData();
	const userName = (ctx.message as Message.TextMessage).text.split(' ')[1].split('@')[1];

	if (users) {
		const user = users.find((item: User) => item[NICKNAME_TG] === userName);

		const daysToBirthdayLeft = await getBirthdayDaysLeft(user);
		const message = user
			? `Until ${user[NICKNAME_TG]} birthday ${daysToBirthdayLeft} days left`
			: 'There are no members with this username';

		ctx.telegram.sendMessage(ctx.message!.chat.id, message);
	}
}
