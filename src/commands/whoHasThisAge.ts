import { RowItemNames, User } from '../interfaces/user.interface';
import getCurrentAge from '../utils/get-current-age';
import getUserData from '../utils/usersData';

const {BIRTHDAY, NICKNAME_TG} = RowItemNames;
export async function whoHasThisAge(ctx: any) {
	try {
		const users: User[] = await getUserData();
		const age = ctx.message.text.split(' ')[1];

		const members = users.filter(((el: User) => getCurrentAge(el[BIRTHDAY]) === Number(age)));
		const string = members.reduce((str: string, user: User) => (str += `${user[NICKNAME_TG]}\n`), '');
		const message = age ? string : 'There are no members with this age';
		ctx.telegram.sendMessage(ctx.message.chat.id, message);
	} catch (error) {
		console.log(error);
	}
}
