import { RowItemNames } from '../enums/user.enum';
import { UserStatusEnum } from '../enums/user-status.enum';
import { User } from '../interfaces/user.interface';

import { zipArrays } from './zip-arrays';

const { google } = require('googleapis');
const sheets = google.sheets('v4');

const { NICKNAME_TG, STATUS } = RowItemNames;
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

		return users.filter((user, index) => valueArr.indexOf(user[NICKNAME_TG]) === index && user[STATUS] === UserStatusEnum.Active);
	} catch (error) {
		console.log('fetchUserData: ', error);
	}
}

export default fetchUserData;
