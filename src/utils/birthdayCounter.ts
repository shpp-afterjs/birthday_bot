import getUserData from './usersData';
import {user} from '../interfaces/interfaces';

async function birthdaysCount(): Promise<{ birthdaysLeft: string; birthdaysWillBe: string; }> {
	const users:user[] = await getUserData();
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

export default birthdaysCount;
