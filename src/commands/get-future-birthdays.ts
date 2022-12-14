import { Context } from 'telegraf';

import { monthStickers } from '../constants/monthStickers';
import zodiacs from '../constants/zodiaks';
import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';
import fetchUserData from '../utils/fetch-user-data';
import { getBirthdayMonths } from '../utils/get-birthday-months';
import getBirthdays from '../utils/get-birthdays';
import getRandomSticker from '../utils/get-randomSticker';
import { zodiacSign } from '../utils/zodiac-sign';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;

export async function getFutureBirthdays(ctx:Context) {
	const users = await fetchUserData();
	const birthdays = await getBirthdays();

	let message = 'There are no members who didn\'t have birthday yet';

	if (birthdays && birthdays.futureBirthdays.length && users) {
		const sortedObj = getBirthdayMonths(birthdays.futureBirthdays);
		let birthdaysList = '';
		for (const key in sortedObj) {
			if ({}.hasOwnProperty.call(sortedObj, key)) {
				if (sortedObj[key].length > 0) {
					birthdaysList += `\n${getRandomSticker(monthStickers[key])}${key}\n${sortedObj[key].map((item:User) => (
						`[${item[NICKNAME_TG]}](t.me/${item[NICKNAME_TG]})-${item[BIRTHDAY]}${zodiacs[zodiacSign(item) as keyof typeof zodiacs]}`))
						.join('\n')}\n`;
				}
			}
		}

		message = `Didn't have birthday this year yet:\n${birthdaysList}`;
	}

	await ctx.telegram.sendMessage(ctx.message!.chat.id, message, { parse_mode: 'Markdown', disable_web_page_preview: true });
}
