import { User } from '../interfaces/user.interface';

import getUserData from './usersData';

async function getBirthdays(): Promise<{ birthdaysLeft: string; birthdaysWillBe: string; }> {
	const users:User[] = await getUserData();
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	let birthdaysWillBe: string = '';
	let birthdaysLeft: string = '';

	users.forEach(item => {
		const arr = item.birthday.split('.');
		const userDay = new Date(`${now.getFullYear()},${arr[1]},${arr[0]}`);
		if (userDay.getTime() - today.getTime() < 0) {
			birthdaysLeft += `${item.username}\n`;
		} else if (userDay.getTime() - today.getTime() > 0) {
			birthdaysWillBe += `${item.username}\n`;
		}
	});

	return {birthdaysLeft, birthdaysWillBe};
}

export default getBirthdays;
