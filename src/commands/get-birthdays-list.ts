import { Context } from 'telegraf';

import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import getUserData from '../utils/get-user-data';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;

export async function getBirthdaysList(ctx: Context) {
	const users = await getUserData();
	if (users) {
		const userBirthday = users.reduce((str: string, user: User) => (str += `${user[NICKNAME_TG]} - ${user[BIRTHDAY]}\n`), '');
		ctx.telegram.sendMessage(ctx.message!.chat.id, userBirthday);
	}
}
