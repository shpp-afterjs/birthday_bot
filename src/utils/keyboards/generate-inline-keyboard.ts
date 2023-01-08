import { Queries } from '../../interfaces/keyboards/keyboards.type';

function generateInlineKeyboard(): Queries {
	const inlineKeyboard: Queries = {
		reply_markup: {
			keyboard: [
				[
					{ text: '/start' },
					{ text: '/about' },
					{ text: '/help' },
				],
				[
					{ text: '/future_birthdays' },
				],
				[
					{ text: '/past_birthdays' },
					{ text: '/birthdays' },
				],
				[
					{ text: '/callback_keyboard' },
					{ text: '/remove' },
				],
			],
		},
		resize_keyboard: true,
		selective: true,
	};

	return inlineKeyboard;
}

export default generateInlineKeyboard;
