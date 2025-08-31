interface BaseUser {
    firstName: string;
    lastName: string;
    phone: string;
    status?: string;
}

export interface Owner extends BaseUser {}

export interface Player extends BaseUser {}
