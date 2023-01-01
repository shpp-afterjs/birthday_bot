import { RowItemNames } from '../enums/user.enum';
import { User } from '../interfaces/user.interface';

const { BIRTHDAY } = RowItemNames;
export function getBirthdayMonths(array: User[]) {
	const monthsArrays:{[key:string]: User[]} = {
		January: [],
		February: [],
		March: [],
		April: [],
		May: [],
		June: [],
		July: [],
		August: [],
		September: [],
		October: [],
		November: [],
		December: [],
	};

	const sortedBirthdays = array.reduce((months, item) => {
		const birthdayMonth = Number(item[BIRTHDAY].split('.')[1]);
		months[Object.keys(months)[birthdayMonth - 1]].push(item);
		return months;
	}, monthsArrays);
	return sortedBirthdays;
}
