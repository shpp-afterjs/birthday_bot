import fetchNode from 'node-fetch';
async function getUserData(): Promise<any> {
	try {
		return await (await fetchNode(process.env.API_KEY as string)).json();
	} catch (error) {
		console.log(error);
	}
}

export default getUserData;

// PROPOSED SOLUTION:
// const {google} = require('googleapis');
// const sheets = google.sheets('v4');
//
// type RowItemType = [
// 	'Отметка времени',
// 	'Адрес электронной почты',
// 	'Ник гитхаба',
// 	'лет',
// 	'Мотивация того, почему ты тут',
// 	'Дата рождения (для вкусняшек)',
// 	'Хочу делать',
// 	'Сколько времени в неделю в среднем уделяешь программированию(в часах)?',
// 	'Чего хотелось бы больше?',
// 	'Ник в телеграме'
// ];
//
// const zipArrays = (keysArray: string[], valuesArray: string[]) =>
// 	Object.fromEntries(
// 		keysArray.map((value, index) => [value, valuesArray[index]]),
// 	);
//
// async function getUserData(): Promise<any> {
// 	try {
// 		const response = (await sheets.spreadsheets.values.get({
// 			spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
// 			range: ['A1:J14'],
// 			auth: process.env.GOOGLE_SPREADSHEET_API_KEY,
// 		})).data;
//
// 		const rowNames = response.values[0];
// 		const rowItems = response.values.slice(1);
//
// 		return rowItems.map((rowItem: RowItemType) => zipArrays(rowNames, rowItem));
// 	} catch (err) {
// 		console.error(err);
// 	}
// }
//
// export default getUserData;
