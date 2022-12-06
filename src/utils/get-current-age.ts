const hours = 24;
const min = 3600;
const days = 365.25;
const num = 1000;

function getCurrentAge(date: string): number {
	const arrDate = date.split('.');
	if (typeof arrDate[2] !== 'undefined') {
		if (arrDate[2] || Number(arrDate[2]) === 0) {
			date = arrDate[2] + '.' + arrDate[1] + '.' + arrDate[0];
		}

		return ((new Date().getTime() - Number(new Date(date))) / (hours * min * days * num)) | 0;
	}

	return 0;
}

export default getCurrentAge;
