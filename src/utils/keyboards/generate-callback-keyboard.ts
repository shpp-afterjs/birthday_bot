import { Context } from 'telegraf';

import { Queries } from '../../interfaces/keyboards/keyboards.type';

function generateCallbackKeyboard(ctx: Context): Queries {
	const { username } = ctx.botInfo;

	const callbackKeyboard: Queries = {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: 'start  🤖', callback_data: 'start' },
					{ text: 'about  ℹ', callback_data: 'about' },
					{ text: 'help  🆘', callback_data: 'help' },
				],
				[
					{ text: 'future birthdays  🎂', callback_data: 'future_birthdays' },
				],
				[
					{ text: 'past birthdays  🎂', callback_data: 'past_birthdays' },
					{ text: 'birthdays  🎂', callback_data: 'birthdays' },
				],
				[
					{ text: 'inline keyboard ⌨', callback_data: 'inline_keyboard' },
					{ text: 'remove ❌', callback_data: 'remove' },
				],
			],
		},
		resize_keyboard: true,
		selective: true,
	};

	callbackKeyboard.reply_markup.inline_keyboard.map(dataArray => dataArray.map(data => {
		data.callback_data += `@${username}`;
		return data;
	}));

	return callbackKeyboard;
}

export default generateCallbackKeyboard;
