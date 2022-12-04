import { Context} from 'telegraf';

import getBirthdays from '../utils/get-birthdays';

export async function getFutureBirthdays(ctx:Context) {
	const members = (await getBirthdays()).futureBirthdays;
	const message = members ? `Didn't have birthday this year yet:\n${members}` : 'There are no members who didn\'t have birthday yet';

	ctx.telegram.sendMessage(ctx.message!.chat.id, message);
}
