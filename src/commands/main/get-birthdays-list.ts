import { Context } from 'telegraf';

import { monthStickers } from '../../constants/monthStickers';
import zodiacs from '../../constants/zodiacs';
import { RowItemNames } from '../../enums/user.enum';
import { User } from '../../interfaces/user.interface';
import fetchUserData from '../../utils/fetch-user-data';
import { getBirthdayMonths } from '../../utils/get-birthday-months';
import getRandomSticker from '../../utils/get-randomSticker';
import { zodiacSign } from '../../utils/zodiac-sign';
import getMsgUpdate from '../get-msg-update';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;
export async function getBirthdaysList(ctx: Context) {
	try {
		const msgUpdate = getMsgUpdate(ctx);

		const users = await fetchUserData();

		clearInterval(await msgUpdate);
		// @ts-ignore
		const { id } = ctx.chat;
		// @ts-ignore
		const { message_id } = ctx.message;
		ctx.telegram.deleteMessage(id, message_id + 1);

		if (users) {
			const sortedObj = getBirthdayMonths(users);
			let birthdaysList = '';
			for (const key in sortedObj) {
				if ({}.hasOwnProperty.call(sortedObj, key)) {
					if (sortedObj[key].length > 0) {
						birthdaysList += `\n${getRandomSticker(monthStickers[key])}${key}\n${sortedObj[key].map((item: User) => (
							`[${item[NICKNAME_TG]}](t.me/${item[NICKNAME_TG]})-${item[BIRTHDAY]}${zodiacs[zodiacSign(item) as keyof typeof zodiacs]}`))
							.join('\n')}\n`;
					}
				}
			}

			const message = users ? birthdaysList : 'There are no users';
			await ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'Markdown', disable_web_page_preview: true });
		}
	} catch (error) {
		console.log(error);
	}
}
