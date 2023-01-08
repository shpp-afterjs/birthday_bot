import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

import { monthStickers } from '../../constants/monthStickers';
import zodiacs from '../../constants/zodiacs';
import { RowItemNames } from '../../enums/user.enum';
import { User } from '../../interfaces/user.interface';
import { getBirthdayMonths } from '../../utils/get-birthday-months';
import getRandomSticker from '../../utils/get-randomSticker';
import { zodiacSign } from '../../utils/zodiac-sign';
import getMsgUpdate from '../get-msg-update';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;
export async function getBirthdaysList(ctx: Context, Bot: Telegraf<Context<Update>>) {
	const users = await getMsgUpdate(ctx, Bot);

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
}
