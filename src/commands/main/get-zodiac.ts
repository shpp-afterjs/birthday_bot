import { Context } from 'telegraf';
import { Message } from 'typegram';

import zodiacs from '../../constants/zodiacs';
import { RowItemNames } from '../../enums/user.enum';
import { User } from '../../interfaces/user.interface';
import fetchUserData from '../../utils/fetch-user-data';
import { zodiacSign } from '../../utils/zodiac-sign';
import getMsgUpdate from '../get-msg-update';

const { NICKNAME_TG } = RowItemNames;

export async function getZodiac(ctx: Context) {
	try {
		const msgUpdate = getMsgUpdate(ctx);

		const users = await fetchUserData();

		clearInterval(await msgUpdate);
		// @ts-ignore
		const { id } = ctx.chat;
		// @ts-ignore
		const { message_id } = ctx.message;
		ctx.telegram.deleteMessage(id, message_id + 1);

		if (/\s+/.test((ctx.message as Message.TextMessage).text)) {
			const userName = (ctx.message as Message.TextMessage).text.split(/\s+/)[1].split('@')[1];
			if (users) {
				const userObject = users.find((item: User) => item[NICKNAME_TG] === userName);
				if (userObject) {
					const zodiac = zodiacSign(userObject);
					const message = `[${userName}](t.me/${userName}) is ${zodiac}${zodiacs[zodiac as keyof typeof zodiacs]}`;
					ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'Markdown', disable_web_page_preview: true });
				} else {
					ctx.telegram.sendMessage(ctx.message!.chat.id, `No data about @${userName}`);
				}
			}
		} else {
			ctx.telegram.sendMessage(ctx.message!.chat.id, 'Name is required');
		}
	} catch (error) {
		console.log(error);
	}
}

