import { Context } from 'telegraf';

import zodiacs from '../constants/zodiaks';
import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import getBirthdays from '../utils/get-birthdays';
import { zodiacSign } from '../utils/zodiac-sign';

const { NICKNAME_TG } = RowItemNames;

export async function getFutureBirthdays(ctx:Context) {
	const users = await fetchUserData();
	const birthdays = await getBirthdays();

	let message = 'There are no members who didn\'t have birthday yet';

	if (birthdays && birthdays.futureBirthdays.length && users) {
		const usersBirthday = birthdays.futureBirthdays.reduce((res, nickName) => {
			const userObject = users.find((item: User) => item[NICKNAME_TG] === nickName);
			return res += `[${nickName}](t.me/${nickName})${zodiacs[zodiacSign(userObject) as keyof typeof zodiacs]}\n`;
		}, '');

		message = `Didn't have birthday this year yet:\n${usersBirthday}`;
	}

	await ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'Markdown', disable_web_page_preview: true });
}
