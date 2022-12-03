import getBirthdays from '../utils/get-birthdays';

export async function getPastBirthdays(ctx: any) {
	const members = (await getBirthdays()).birthdaysLeft;
	const message = members ? `Already had birthday this year:\n${members}` : 'There are no members who already had bithday thi year';

	ctx.telegram.sendMessage(ctx.message.chat.id, message);
}
