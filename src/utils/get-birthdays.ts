import { Birthdays } from '../interfaces/birthdays.interface';
import {RowItemNames, User} from '../interfaces/user.interface';

import getUserData from './usersData';

const {NICKNAME_TG, BIRTHDAY} = RowItemNames;
async function getBirthdays(): Promise<Birthdays> {
	const users = await getUserData();
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const object = users!.reduce((obj:Birthdays, item: User) => {
		const arr = item[BIRTHDAY].split('.');
		const userDay = new Date(`${now.getFullYear()},${arr[1]},${arr[0]}`);
		if (userDay.getTime() - today.getTime() < 0) {
			obj.futureBirthdays += `${item[NICKNAME_TG]}\n`;
		} else if (userDay.getTime() - today.getTime() > 0) {
			obj.pastBirthdays += `${item[NICKNAME_TG]}\n`;
		}

		return obj;
	}, {futureBirthdays: '', pastBirthdays: '' });

	return object;
}

export default getBirthdays;
