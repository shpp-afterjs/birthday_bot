import { Context } from 'telegraf';

function removeCallbackKeyboard(ctx: Context) {
	ctx.deleteMessage();
}

export default removeCallbackKeyboard;
