import { Context } from 'telegraf';

import typingTime from '../constants/typingTime';

function replyMsgWithAction(ctx: Context, func: Function) {
	try {
		ctx.replyWithChatAction('typing');

		setTimeout(() => {
			func(ctx);
		}, typingTime);
	} catch (error) {
		console.log(error);
	}
}

export default replyMsgWithAction;
