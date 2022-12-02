import { User } from '../interfaces/user.interface';

import getUserData from './usersData';

async function getBirthdays(): Promise<any> {
	const users:User[] = await getUserData();
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const object = users.reduce((obj: {birthdaysWillBe: string, birthdaysLeft: string }, item) => {
		const arr = item.birthday.split('.');
		const userDay = new Date(`${now.getFullYear()},${arr[1]},${arr[0]}`);
		if (userDay.getTime() - today.getTime() < 0) {
			obj.birthdaysLeft += `${item.username}\n`;
		} else if (userDay.getTime() - today.getTime() > 0) {
			obj.birthdaysWillBe += `${item.username}\n`;
		}

		return obj;
	}, {birthdaysWillBe: '', birthdaysLeft: '' });

	return object;
}

export default getBirthdays;
