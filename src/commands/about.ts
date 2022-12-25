import { Context } from 'telegraf';

import messages from '../constants/messages';

function about(ctx: Context) {
	ctx.reply(messages.ABOUT_MESSAGE);
}

export default about;
