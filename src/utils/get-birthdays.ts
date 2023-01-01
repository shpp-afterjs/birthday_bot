import { RowItemNames } from '../enums/user.enum';
import { Birthdays } from '../interfaces/birthdays.interface';
import { User } from '../interfaces/user.interface';

import fetchUserData from './fetch-user-data';

const { BIRTHDAY } = RowItemNames;
async function getBirthdays(): Promise<Birthdays | undefined> {
	const users = await fetchUserData();
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	if (users) {
		return users.reduce((obj: Birthdays, item: User) => {
			const birthdayDate = item[BIRTHDAY].split('.');
			const birthdayDateThisYear = new Date(`${now.getFullYear()},${birthdayDate[1]},${birthdayDate[0]}`);

			if (birthdayDateThisYear.getTime() - today.getTime() < 0) {
				obj.pastBirthdays.push(item);
			} else {
				obj.futureBirthdays.push(item);
			}

			return obj;
		}, { futureBirthdays: [], pastBirthdays: [] });
	}
}

export default getBirthdays;
