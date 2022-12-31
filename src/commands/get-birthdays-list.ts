import { Context } from 'telegraf';

import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;

export async function getBirthdaysList(ctx: Context) {
	const users = await fetchUserData();

	if (users) {
		const userBirthday = users.reduce((str: string, user: User) => (str += `[${user[NICKNAME_TG]}](t.me/${user[NICKNAME_TG]}) - ${user[BIRTHDAY]}\n`), '');
		const message = users ? userBirthday : 'There are no users';
		await ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'Markdown', disable_web_page_preview: true });
	}
}
