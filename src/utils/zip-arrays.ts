export const zipArrays = (keysArray: string[], valuesArray: string[]) =>
	Object.fromEntries(
		keysArray.map((value, index) => [value, valuesArray[index]]),
	);
