import stickers from './stickers';

function getSticker(): string {
	const min = 0;
	const max = stickers.length;
	const index = Math.floor((Math.random() * (max - min + 1)) + min);
	return stickers[index];
}

export default getSticker;
