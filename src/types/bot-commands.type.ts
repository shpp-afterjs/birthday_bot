import CommandKeys from '../enums/command.enum';

type Command = {
  readonly [key in CommandKeys]: string;
};

type Commands = Command[]

export default Commands;
