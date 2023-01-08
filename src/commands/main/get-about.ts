import { Context } from 'telegraf';

import messages from '../../constants/messages';

function getAbout(ctx: Context) {
	ctx.reply(messages.ABOUT_MESSAGE);
}

export default getAbout;
