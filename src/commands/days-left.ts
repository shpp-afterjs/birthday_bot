import { Context } from 'telegraf';
import { Message } from 'typegram';

import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import { getBirthdayDaysLeft } from '../utils/get-birthday-days-left';
import getUserData from '../utils/get-user-data';

const { NICKNAME_TG } = RowItemNames;
export async function daysLeft(ctx:Context) {
	const users = await getUserData();
	const userName = (ctx.message as Message.TextMessage).text.split(' ')[1].split('@')[1];
	if (users) {
		const userObject = users.find((item: User) => item[NICKNAME_TG] === userName);
		const days = await getBirthdayDaysLeft(userObject);
		const message = userObject ? `Until ${userObject[NICKNAME_TG]} birthday ${days} days left` : 'There are no members with this username';
		ctx.telegram.sendMessage(ctx.message!.chat.id, message);
	}
}
