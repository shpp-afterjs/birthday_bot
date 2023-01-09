import CommandsList from '../types/commands-list.type';

const commandsList: CommandsList = [
	{ command: '/start', description: 'start the bot' },
	{ command: '/help', description: 'help command' },
	{ command: '/about', description: 'about the bot' },
	{ command: '/birthdays', description: 'list of all birthdays' },
	{ command: '/future_birthdays', description: 'list of all future birthdays' },
	{ command: '/past_birthdays', description: 'list of all past birthdays' },
	{ command: '/get_birthday', description: 'birthday of specific user' },
	{ command: '/get_age', description: 'age of specific user' },
	{ command: '/who_has_this_age', description: 'get users with specific age' },
	{ command: '/callback_keyboard', description: 'get callback keyboard' },
];

export default commandsList;
