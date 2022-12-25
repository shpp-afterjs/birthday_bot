
import { Context } from 'telegraf';

import zodiacs from '../constants/zodiaks';
import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import getBirthdays from '../utils/get-birthdays';
import { zodiacSign } from '../utils/zodiac-sign';

const { NICKNAME_TG } = RowItemNames;

export async function getPastBirthdays(ctx:Context) {
	const users = await fetchUserData();
	const birthdays = await getBirthdays();

	let message = 'There are no members who already had birthday this year';

	if (birthdays && birthdays.pastBirthdays.length && users) {
		const usersBirthday = birthdays.pastBirthdays.reduce((res, nickName) => {
			const userObject = users.find((item: User) => item[NICKNAME_TG] === nickName);
			return res += `${nickName}${zodiacs[zodiacSign(userObject) as keyof typeof zodiacs]}\n`;
		}, '');

		message = `Already had birthday this year:\n${usersBirthday}`;
	}

	await ctx.telegram.sendMessage(ctx.message!.chat.id, message);
}
