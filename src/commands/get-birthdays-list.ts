import { Context } from 'telegraf';

import zodiacs from '../constants/zodiaks';
import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import { getBirthdayMonths } from '../utils/get-birthday-months';
import { zodiacSign } from '../utils/zodiac-sign';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;
export async function getBirthdaysList(ctx: Context) {
	const users = await fetchUserData();

	if (users) {
		const sortedObj = getBirthdayMonths(users);
		let birthdaysList = '';
		for (const key in sortedObj) {
			if ({}.hasOwnProperty.call(sortedObj, key)) {
				if (sortedObj[key].length > 0) {
					birthdaysList += `\n${key}\n${sortedObj[key].map((item:User) => (
						`[${item[NICKNAME_TG]}](t.me/${item[NICKNAME_TG]})-${item[BIRTHDAY]}${zodiacs[zodiacSign(item) as keyof typeof zodiacs]}`))
						.join('\n')}\n`;
				}
			}
		}

		const message = users ? birthdaysList : 'There are no users';
		await ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'Markdown', disable_web_page_preview: true });
	}
}
