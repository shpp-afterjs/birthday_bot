import { RowItemNames, User } from '../interfaces/user.interface';

// PROPOSED SOLUTION:
const {google} = require('googleapis');
const sheets = google.sheets('v4');

type RowItemType = [
	'Отметка времени',
	'Адрес электронной почты',
	'Ник гитхаба',
	'лет',
	'Мотивация того, почему ты тут',
	'Дата рождения (для вкусняшек)',
	'Хочу делать',
	'Сколько времени в неделю в среднем уделяешь программированию(в часах)?',
	'Чего хотелось бы больше?',
	'Ник в телеграме'
];
const {NICKNAME_TG} = RowItemNames;
const zipArrays = (keysArray: string[], valuesArray: string[]) =>
	Object.fromEntries(
		keysArray.map((value, index) => [value, valuesArray[index]]),
	);

async function getUserData(): Promise<User[] | undefined> {
	try {
		const response = (await sheets.spreadsheets.values.get({
			spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
			range: ['A1:J14'],
			auth: process.env.GOOGLE_SPREADSHEET_API_KEY,
		})).data;

		const rowNames = response.values[0];
		const rowItems = response.values.slice(1);
		const users: User[] = rowItems.map((rowItem: RowItemType) => zipArrays(rowNames, rowItem));

		return users.filter((v, i, a) => a.findIndex(t => (t[NICKNAME_TG] === v[NICKNAME_TG])) === i);
	} catch (error) {
		console.log(error);
	}
}

export default getUserData;
