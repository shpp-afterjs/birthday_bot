import { Context } from 'telegraf';

import messages from '../constants/messages';

function start(ctx: Context) {
	ctx.reply(messages.START_MESSAGE);
}

export default start;
