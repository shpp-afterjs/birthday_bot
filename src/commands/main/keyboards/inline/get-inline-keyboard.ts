import { Context } from 'telegraf';

import { Queries } from '../../../../interfaces/keyboards/keyboards.type';
import generateInlineKeyboard from '../../../../utils/keyboards/generate-inline-keyboard';

function getInlineKeyboard(ctx: Context) {
	const inlineKeyboard: Queries = generateInlineKeyboard();

	ctx.sendMessage('Some user has opened inline keyboard.', inlineKeyboard);
}

export default getInlineKeyboard;
