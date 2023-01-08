import CallbackMessage from './callbackKeyboard.interface';
import InlineMessage from './inlineKeyboard.interface';

export type QueriesSettings = {
    readonly resize_keyboard?: boolean,
    readonly one_time_keyboard?: boolean,
    readonly selective?: boolean
}

export type Queries = QueriesSettings &
({ readonly reply_markup: { inline_keyboard: Array<CallbackMessage[]>} } | { readonly reply_markup: { keyboard: Array<InlineMessage[]> }})
