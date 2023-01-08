import { Context } from 'telegraf';

import HandleCommand from './handleCommand.interface';

interface ReplyMsgWithAction extends HandleCommand {
    ctx: Context
}

export default ReplyMsgWithAction;
