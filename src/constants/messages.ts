import Messages from '../types/messages.type';

const messages: Messages = {
	HELP_MESSAGE:
	`/about - about this bot
/birthdays - list of all birthdays
/getAge {number} - age of member
/getBirthday {@nickname} - remain days to birthday from today
/pastBirthdays  - list of members who already had birthday this year
/futureBirthdays - list of members who will have birthday this year
/whoHasThisAge {number} - people who has this age`,
	ABOUT_MESSAGE: 'This bot will help you to remember your team birthdays. The Source code is <a href="github.com/shpp-afterjs/birthday_bot">here</a>.',
	START_MESSAGE: 'Hello! It is the birthday bot. Welcome!',
};

export default messages;
