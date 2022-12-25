import { Context } from 'telegraf';

import messages from '../constants/messages';

function help(ctx: Context) {
	ctx.reply(messages.HELP_MESSAGE);
}

export default help;
