
import { RowItemNames } from '../enums/user.enum';
import { UserStatusEnum } from '../enums/user-status.enum';

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
	STATUS,
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
    [NICKNAME_TG]: string,
    [STATUS]: UserStatusEnum
}
