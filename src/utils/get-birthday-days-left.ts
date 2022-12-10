import { RowItemNames } from '../enums/user.enum';

const { BIRTHDAY } = RowItemNames;
const hours = 24;
const minutes = 60;
const seconds = 1000;

export async function getBirthdayDaysLeft(user: any) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	if (user) {
		const arrBirthday = user[BIRTHDAY].split('.');
		let userDay = new Date(`${now.getFullYear()},${arrBirthday[1]},${arrBirthday[0]}`);
		if ((Number(userDay) - Number(today)) < 0) {
			userDay = new Date(`${now.getFullYear() + 1},${arrBirthday[1]},${arrBirthday[0]}`);
		}

		return Math.round((Number(userDay) - Number(today)) / (seconds * minutes * minutes * hours));
	}
}
