function getCurrentAge(date: string): number {
	const d = date.split('.');
	if (typeof d[2] !== 'undefined') {
		date = d[2] + '.' + d[1] + '.' + d[0];
		// eslint-disable-next-line no-bitwise
		return ((new Date().getTime() - Number(new Date(date))) / (24 * 3600 * 365.25 * 1000)) | 0;
	}

	return 0;
}

export default getCurrentAge;
