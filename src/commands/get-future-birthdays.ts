import { Context } from 'telegraf';

import getBirthdays from '../utils/get-birthdays';

export async function getFutureBirthdays(ctx:Context) {
	const futureBirthdays = await getBirthdays();

	if (futureBirthdays) {
		const usersBirthday = futureBirthdays.futureBirthdays.join('\n');
		const message = usersBirthday
			? `Didn't have birthday this year yet:\n${usersBirthday}`
			: 'There are no members who didn\'t have birthday yet';

		ctx.telegram.sendMessage(ctx.message!.chat.id, message);
	}
}
