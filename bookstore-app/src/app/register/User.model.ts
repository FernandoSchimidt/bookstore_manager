export class User {
    id!: number;
    login: string;
    name: string;
    password: string;

    constructor( login: string, name: string, password: string) {
        this.login = login;
        this.name = name;
        this.password = password;
    }
}