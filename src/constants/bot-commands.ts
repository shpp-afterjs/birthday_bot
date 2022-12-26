import Commands from '../types/bot-commands.type';

const BOT_COMMANDS: Commands = [
	{ command: '/start', description: 'start bot' },
	{ command: '/help', description: 'help command' },
	{ command: '/about', description: 'about bot' },
	{ command: '/birthdays', description: 'gets list of birthdays' },
	{ command: '/past_birthdays', description: 'gets birthdays that have left this year.' },
	{ command: '/future_birthdays', description: 'gets birthdays that will be this year' },
	{ command: '/get_birthday', description: 'gets birthday of the user' },
	{ command: '/get_age', description: 'gets age of the user' },
	{ command: '/who_has_this_age', description: 'check who has some age with users' },
];

export default BOT_COMMANDS;
