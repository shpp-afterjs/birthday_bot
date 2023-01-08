import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

import fetchUserData from '../utils/fetch-user-data';

import getLoadingAnimation from './get-loading-animation';

async function getMsgUpdate(ctx: Context, bot: Telegraf<Context<Update>>) {
	// @ts-ignore
	const { id } = ctx.update.message.chat;
	// @ts-ignore
	const { message_id } = ctx.update.message;

	await bot.telegram.sendMessage(id, '<b> Updating \\ </b>', { parse_mode: 'HTML' });

	const updateMessage = setInterval(() => {
		getLoadingAnimation(ctx);
	}, 1000);

	const users = await fetchUserData();

	clearInterval(updateMessage);
	ctx.telegram.deleteMessage(id, message_id + 1);

	return users;
}

export default getMsgUpdate;
