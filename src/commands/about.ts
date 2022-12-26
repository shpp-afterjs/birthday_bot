import { Context } from 'telegraf';

import messages from '../constants/messages';

function about(ctx: Context) {
	ctx.reply(messages.ABOUT_MESSAGE, { parse_mode: 'HTML' });
}

export default about;
