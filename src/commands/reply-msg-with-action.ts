import { Context } from 'telegraf';

import typingTime from '../constants/typingTime';

function replyMsgWithAction(ctx: Context, func: Function) {
	ctx.replyWithChatAction('typing');

	setTimeout(() => {
		func(ctx);
	}, typingTime);
}

export default replyMsgWithAction;
