import { Context } from 'telegraf';

import getBirthdays from '../utils/get-birthdays';

export async function getFutureBirthdays(ctx:Context) {
	const birthdays = await getBirthdays();

	let message = 'There are no members who didn\'t have birthday yet';

	if (birthdays && birthdays.futureBirthdays.length) {
		const usersBirthday = birthdays.futureBirthdays.reduce((res, nickname) => (res += `@${nickname}\n`), '');

		message = `Didn't have birthday this year yet:\n${usersBirthday}`;
	}

	await ctx.telegram.sendMessage(ctx.message!.chat.id, message);
}
