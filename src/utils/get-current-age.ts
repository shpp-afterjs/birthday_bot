const hours = 24;
const min = 3600;
const days = 365.25;
const num = 1000;

function getCurrentAge(date: string): number {
	const d = date.split('.');
	if (typeof d[2] !== 'undefined') {
		if (d[2] || Number(d[2]) === 0) {
			date = d[2] + '.' + d[1] + '.' + d[0];
		}

		return ((new Date().getTime() - Number(new Date(date))) / (hours * min * days * num)) | 0;
	}

	return 0;
}

export default getCurrentAge;
