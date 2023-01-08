type CallbackMessageKeys = 'text' | 'callback_data';

type CallbackMessage = {
    [key in CallbackMessageKeys]: string
}

export default CallbackMessage;
