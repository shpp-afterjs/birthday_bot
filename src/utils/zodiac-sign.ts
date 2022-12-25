
import { RowItemNames } from '../enums/user.enum';

const { BIRTHDAY } = RowItemNames;

export function zodiacSign(userObject: any) {
	const bound = [20, 19, 20, 20, 20, 21, 22, 22, 21, 22, 21, 21];
	const startMonth = ['Capricorn',
		'Aquarius',
		'Pisces',
		'Aries',
		'Taurus',
		'Gemini',
		'Cancer',
		'Leo',
		'Virgo',
		'Libra',
		'Scorpio',
		'Sagittarius'];
	if (userObject) {
		const arrBirthday = userObject[BIRTHDAY].split('.');
		const month = Number(arrBirthday[1]);
		const day = Number(arrBirthday[0]);
		const monthIndex = month - 1;
		let signMonthIndex = 0;
		if (day <= bound[monthIndex]) {
			signMonthIndex = monthIndex;
		} else {
			signMonthIndex = (monthIndex + 1) % 12;
		}

		return startMonth[signMonthIndex];
	}
}

