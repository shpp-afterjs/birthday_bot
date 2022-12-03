import {RowItemNames} from '../interfaces/user.interface';

import getUserData from './usersData';
async function getBirthdays(): Promise<any> {
	const users:any = await getUserData();
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const object = users.reduce((obj: {birthdaysWillBe: string, birthdaysLeft: string }, item: any) => {
		const arr = item[RowItemNames.BIRTHDAY].split('.');
		console.log('arr => ', item[RowItemNames.BIRTHDAY]);
		const userDay = new Date(`${now.getFullYear()},${arr[1]},${arr[0]}`);
		if (userDay.getTime() - today.getTime() < 0) {
			obj.birthdaysLeft += `${item[RowItemNames.NICKNAME_TG]}\n`;
		} else if (userDay.getTime() - today.getTime() > 0) {
			obj.birthdaysWillBe += `${item[RowItemNames.NICKNAME_TG]}\n`;
		}

		return obj;
	}, {birthdaysWillBe: '', birthdaysLeft: '' });

	return object;
}

export default getBirthdays;
