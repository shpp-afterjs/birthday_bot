import { Context } from 'telegraf';
import { Message } from 'typegram';

import { RowItemNames } from '../../enums/user.enum';
import { User } from '../../interfaces/user.interface';
import fetchUserData from '../../utils/fetch-user-data';
import getCurrentAge from '../../utils/get-current-age';
import getMsgUpdate from '../get-msg-update';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;

export async function getAge(ctx: Context) {
	try {
		const msgUpdate = getMsgUpdate(ctx);
		const users = await fetchUserData();
		clearInterval(await msgUpdate);
		if (/\s+/.test((ctx.message as Message.TextMessage).text)) {
			const userName = (ctx.message as Message.TextMessage).text.split(/\s+/)[1].split('@')[1];
			if (users) {
				const userObject = users.find((item: User) => item[NICKNAME_TG] === userName);
				if (userObject) {
					const age = getCurrentAge(userObject[BIRTHDAY]);
					const message = userObject ? `[${userObject[NICKNAME_TG]}](t.me/${userObject[NICKNAME_TG]}) is ${age} years old` : 'There is no member with this username';
					await ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'Markdown', disable_web_page_preview: true });
				}
			}
		} else {
			ctx.telegram.sendMessage(ctx.message!.chat.id, 'Nickname is required');
		}
	} catch (error) {
		console.log('getAge: ', error);
	}
}
