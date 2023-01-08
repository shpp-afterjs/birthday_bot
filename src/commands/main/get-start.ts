import { Context } from 'telegraf';

import messages from '../../constants/messages';

function getStart(ctx: Context) {
	console.log('start message');

	ctx.reply(messages.START_MESSAGE);
}

export default getStart;
