import { Context } from 'telegraf';

async function getLoadingAnimation(ctx: Context): Promise<Context | void> {
	try {
		// @ts-ignore
		const { id } = ctx.update.message.chat;
		// @ts-ignore
		const { message_id } = ctx.update.message;

		const editedMessagesId = message_id + 1;

		await ctx.telegram.editMessageText(id, editedMessagesId, undefined, '<b> Updating |  </b>', {
			parse_mode: 'HTML',
		});
		await ctx.telegram.editMessageText(id, editedMessagesId, undefined, '<b> Updating / </b>', {
			parse_mode: 'HTML',
		});
		await ctx.telegram.editMessageText(id, editedMessagesId, undefined, '<b> Updating -  </b>', {
			parse_mode: 'HTML',
		});
		await ctx.telegram.editMessageText(id, editedMessagesId, undefined, '<b> Updating \\  </b>', {
			parse_mode: 'HTML',
		});

		return ctx;
	} catch (error) {
		console.log(error);
	}
}

export default getLoadingAnimation;
