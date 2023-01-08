
import { Context } from 'telegraf';

function removeInlineKeyboard(ctx: Context) {
	ctx.sendMessage('Some callback keyboard is removed now.', {
		reply_markup: {
			resize_keyboard: true,
			remove_keyboard: true,
		},
	});
}

export default removeInlineKeyboard;
