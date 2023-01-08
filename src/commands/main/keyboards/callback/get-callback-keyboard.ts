import { Context } from 'telegraf';

import { Queries } from '../../../../interfaces/keyboards/keyboards.type';
import generateCallbackKeyboard from '../../../../utils/keyboards/generate-callback-keyboard';

function getCallbackKeyboard(ctx: Context) {
	const callbackKeyboard: Queries = generateCallbackKeyboard(ctx);

	ctx.sendMessage('Some user has opened callback keyboard.', callbackKeyboard);
}

export default getCallbackKeyboard;
