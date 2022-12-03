/* eslint-disable no-unused-vars */

export enum RowItemNames {
    CREATED_AT = 'Отметка времени',
    EMAIL = 'Адрес электронной почты',
    NICKNAME = 'Ник гитхаба',
    AGE = 'лет',
    MOTIVATION = 'Мотивация того, почему ты тут',
    BIRTHDAY = 'Дата рождения (для вкусняшек)',
    DESIRED_ACTIVITIES = 'Хочу делать',
    PROGRAMMING_TIME = 'Сколько времени в неделю в среднем уделяешь программированию(в часах)?',
    WISHES = 'Чего хотелось бы больше?',
    NICKNAME_TG = 'Ник в телеграме'
}

const {
	CREATED_AT,
	EMAIL,
	NICKNAME,
	AGE,
	MOTIVATION,
	BIRTHDAY,
	DESIRED_ACTIVITIES,
	PROGRAMMING_TIME,
	WISHES,
	NICKNAME_TG,
} = RowItemNames;

export interface User {
    [CREATED_AT]: string,
    [EMAIL]: string,
    [NICKNAME]: string,
    [AGE]: string,
    [MOTIVATION]: string,
    [BIRTHDAY]: string,
    [DESIRED_ACTIVITIES]: string,
    [PROGRAMMING_TIME]: string,
    [WISHES]: string,
    [NICKNAME_TG]: string
}
