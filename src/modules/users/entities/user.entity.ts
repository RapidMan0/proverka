export class User {
    id: number;
    name: string;
    email?: string;
    locationId?: number;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
