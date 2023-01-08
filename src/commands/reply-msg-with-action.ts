import typingTime from '../constants/typingTime';
import ReplyMsgWithAction from '../interfaces/reply-msg-with-action.interface';

import handleCommand from './handle-command';

function replyMsgWithAction(args: ReplyMsgWithAction) {
	args.ctx.replyWithChatAction('typing');

	setTimeout(() => {
		handleCommand(args);
	}, typingTime);
}

export default replyMsgWithAction;
