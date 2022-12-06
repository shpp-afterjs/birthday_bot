import { RowItemNames } from '../enums/user.enum';
import { Birthdays } from '../interfaces/birthdays.interface';
import { User } from '../interfaces/user.interface';

import getUserData from './get-user-data';

const { NICKNAME_TG, BIRTHDAY } = RowItemNames;
async function getBirthdays(): Promise<Birthdays | undefined> {
	const users = await getUserData();
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	if (users) {
		const objectBirthdays = users.reduce((obj:Birthdays, item: User) => {
			const arrBirthday = item[BIRTHDAY].split('.');
			const userDay = new Date(`${now.getFullYear()},${arrBirthday[1]},${arrBirthday[0]}`);
			if (userDay.getTime() - today.getTime() < 0) {
				obj.pastBirthdays += `${item[NICKNAME_TG]}\n`;
			} else if (userDay.getTime() - today.getTime() > 0) {
				obj.futureBirthdays += `${item[NICKNAME_TG]}\n`;
			}

			return obj;
		}, { futureBirthdays: '', pastBirthdays: '' });
		return objectBirthdays;
	}
}

export default getBirthdays;
