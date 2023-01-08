import { Context } from 'telegraf';

import messages from '../../constants/messages';

function getHelp(ctx: Context) {
	ctx.reply(messages.HELP_MESSAGE);
}

export default getHelp;
