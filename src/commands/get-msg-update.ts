import { Context } from 'telegraf';

import getLoadingAnimation from './get-loading-animation';

async function getMsgUpdate(ctx: Context): Promise<any | void> {
	try {
		await ctx.reply('<b> Updating \\ </b>', { parse_mode: 'HTML' });

		const updateMessage = setInterval(() => {
			getLoadingAnimation(ctx);
		}, 1000);

		return updateMessage;
	} catch (error) {
		console.log(error);
	}
}

export default getMsgUpdate;
