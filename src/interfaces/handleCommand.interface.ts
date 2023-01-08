import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

export interface HandleCommand {
    Bot: Telegraf<Context<Update>>,
    commandName: string, // Without a slash
	func: Function,
}

export default HandleCommand;
