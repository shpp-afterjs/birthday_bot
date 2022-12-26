import CreatorKeys from '../enums/creator.enum';

export type Creator = {
    readonly [key in CreatorKeys]: string;
} & {
    readonly username_TG?: string;
}

export type Creators = Creator[];

export type Inline_Query = {
    readonly team: Creators
};
