import { Context } from 'telegraf';

import messages from '../../constants/messages';

function getStart(ctx: Context) {
	console.log('you are in the start command now.');
	ctx.reply(messages.START_MESSAGE);
}

export default getStart;
