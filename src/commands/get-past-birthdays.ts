import { Context } from 'telegraf';

import getBirthdays from '../utils/get-birthdays';

export async function getPastBirthdays(ctx: Context) {
	const birthdays = await getBirthdays();

	let message = 'There are no members who already had birthday this year';

	if (birthdays && birthdays.pastBirthdays.length) {
		const usersBirthday = birthdays.pastBirthdays.reduce((res, nickname) => {
			nickname = nickname.replace('@', '');
			const linkToUser: string = `<a href="t.me/${nickname}">${nickname}</a>`;

			return (res += `${linkToUser} \n`);
		}, '');

		message = `Already had birthday this year:\n${usersBirthday}`;
	}

	await ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'HTML', disable_web_page_preview: true });
}
