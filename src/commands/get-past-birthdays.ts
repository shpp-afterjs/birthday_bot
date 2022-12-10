import { Context } from 'telegraf';

import getBirthdays from '../utils/get-birthdays';

export async function getPastBirthdays(ctx:Context) {
	const pastBirthdays = await getBirthdays();

	if (pastBirthdays) {
		const users = pastBirthdays.pastBirthdays.join('\n');
		const message = users
			? `Already had birthday this year:\n${users}`
			: 'There are no members who already had birthday this year.';

		ctx.telegram.sendMessage(ctx.message!.chat.id, message);
	}
}
