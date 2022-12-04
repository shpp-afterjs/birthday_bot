import { RowItemNames} from '../interfaces/user.interface';

const {BIRTHDAY} = RowItemNames;
const hours = 24;
const minutes = 60;
const seconds = 1000;
export async function daysUntilBirthday(user: any) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	if (user) {
		const arr = user[BIRTHDAY].split('.');
		let userDay = new Date(`${now.getFullYear()},${arr[1]},${arr[0]}`);
		if (Number(userDay) - Number(today) < 0) {
			userDay = new Date(`${now.getFullYear() + 1},${arr[1]},${arr[0]}`);
		}

		return Math.round((Number(userDay) - Number(today)) / (seconds * minutes * minutes * hours));
	}
}
