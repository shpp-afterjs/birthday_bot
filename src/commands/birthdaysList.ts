import { Context} from 'telegraf';

import { RowItemNames, User } from '../interfaces/user.interface';
import getUserData from '../utils/usersData';

const {NICKNAME_TG, BIRTHDAY} = RowItemNames;

export async function birthdaysList(ctx: Context) {
	const users: User[] | undefined = await getUserData();
	const str = users!.reduce((str: string, user: User) => (str += `${user[NICKNAME_TG]} - ${user[BIRTHDAY]}\n`), '');
	ctx.telegram.sendMessage(ctx.message!.chat.id, str);
}
