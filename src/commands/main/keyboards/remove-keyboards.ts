import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

import removeCallbackKeyboard from './callback/remove-callback-keyboard';
import removeInlineKeyboard from './inline/remove-inline-keyboard';

async function removeKeyboards(bot: Telegraf<Context<Update>>): Promise<void> {
	const botUsername: string = await bot.telegram.getMe().then(bot => bot.username);

	bot.command('remove', ctx => removeInlineKeyboard(ctx));
	bot.command(`remove@${botUsername}`, ctx => removeInlineKeyboard(ctx));

	bot.action('remove', ctx => removeCallbackKeyboard(ctx));
	bot.action(`remove@${botUsername}`, ctx => removeCallbackKeyboard(ctx));
}

export default removeKeyboards;
