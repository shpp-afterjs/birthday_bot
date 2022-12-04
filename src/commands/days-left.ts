import { Context} from 'telegraf';
import {Message } from 'typegram';

import { RowItemNames, User } from '../interfaces/user.interface';
import { daysUntilBirthday } from '../utils/days-until-birthday';
import getUserData from '../utils/usersData';

const {NICKNAME_TG} = RowItemNames;
export async function daysLeft(ctx:Context) {
	const users: User[] | undefined = await getUserData();
	const userName = (ctx.message as Message.TextMessage).text.split(' ')[1].split('@')[1];
	const obj = users!.find((item: User) => item[NICKNAME_TG] === userName);
	const days = await daysUntilBirthday(obj);
	const message = obj ? `Until ${obj[NICKNAME_TG]} birthday ${days} days left` : 'There are no members with this username';
	ctx.telegram.sendMessage(ctx.message!.chat.id, message);
}
