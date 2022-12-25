export function replyFuncWithAction(func: Function, ctx: any, typingTime: number) {
	ctx.replyWithChatAction('typing');
	setTimeout(() => func(ctx), typingTime);
}
