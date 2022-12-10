import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';

import { zipArrays } from './zip-arrays';

const { google } = require('googleapis');
const sheets = google.sheets('v4');

const { NICKNAME_TG } = RowItemNames;
async function fetchUserData(): Promise<User[] | undefined> {
	try {
		const response = (await sheets.spreadsheets.values.get({
			spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
			range: ['A1:ZZ'],
			auth: process.env.GOOGLE_SPREADSHEET_API_KEY,
		})).data;

		const rowNames = response.values[0];
		const rowItems = response.values.slice(1) as (typeof RowItemNames)[keyof typeof RowItemNames][];
		const users = rowItems.map((rowItem: (typeof RowItemNames)[keyof typeof RowItemNames]) => zipArrays(rowNames, rowItem as unknown as string[])) as unknown as User[];

		const valueArr = users.map(item => item[NICKNAME_TG]);
		console.log(users.filter((item, idx) => valueArr.indexOf(item[NICKNAME_TG]) === idx));

		return users.filter((item, idx) => valueArr.indexOf(item[NICKNAME_TG]) === idx);
	} catch (error) {
		console.log(error);
	}
}

export default fetchUserData;
