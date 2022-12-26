type Message = 'HELP_MESSAGE' | 'ABOUT_MESSAGE' | 'START_MESSAGE';

type Messages = {
	readonly [key in Message]: string
}

export default Messages;
