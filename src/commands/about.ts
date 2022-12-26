import { Context } from 'telegraf';

import messages from '../constants/messages';

function about(ctx: Context) {
	ctx.reply(messages.ABOUT_MESSAGE, { parse_mode: 'HTML', disable_web_page_preview: true });
}

export default about;
