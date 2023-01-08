import { Context } from 'telegraf';

import HandleCommand from '../interfaces/handleCommand.interface';

import replyMsgWithAction from './reply-msg-with-action';

async function handleCommand(args: HandleCommand): Promise<void> {
	try {
		const { Bot, commandName, func } = args;

		const botUsername: string = await Bot.telegram.getMe().then(bot => bot.username);

		Bot.command(commandName, async (ctx: Context) => {
			replyMsgWithAction(ctx, func);
		});
		Bot.command(`${commandName}@${botUsername}`, async (ctx: Context) => {
			replyMsgWithAction(ctx, func);
		});
		Bot.action(`${commandName}@${botUsername}`, async (ctx: Context) => {
			replyMsgWithAction(ctx, func);
		});
	} catch (error) {
		console.log(error);
	}
}

export default handleCommand;
