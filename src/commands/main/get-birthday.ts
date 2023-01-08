import { Context, Telegraf } from 'telegraf';
import { Message, Update } from 'typegram';

import { RowItemNames } from '../../enums/user.enum';
import { User } from '../../interfaces/user.interface';
import { getBirthdayDaysLeft } from '../../utils/get-birthday-days-left';
import getMsgUpdate from '../get-msg-update';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;
export async function getBirthday(ctx: Context, Bot: Telegraf<Context<Update>>) {
	const users = await getMsgUpdate(ctx, Bot);
	let message = 'Nickname is required';

	if (/\s+/.test((ctx.message as Message.TextMessage).text)) {
		const userName = (ctx.message as Message.TextMessage).text.split(/\s+/)[1].split('@')[1];

		if (userName && users) {
			const user = users.find((item: User) => item[NICKNAME_TG] === userName);

			const daysToBirthdayLeft = await getBirthdayDaysLeft(user);
			message = user
				? `There are ${daysToBirthdayLeft} days until [${user[NICKNAME_TG]}](t.me/${user[NICKNAME_TG]}) birthday! \n📍${user[BIRTHDAY]}`
				: 'There are no members with this username';
		}
	}

	ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'Markdown', disable_web_page_preview: true });
}
