export class User {
    id!: number;
    username: string;
    name: string;
    password: string;

    constructor( username: string, name: string, password: string) {
        this.username = username;
        this.name = name;
        this.password = password;
    }
}