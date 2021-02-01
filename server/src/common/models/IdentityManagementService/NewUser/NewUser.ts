import { ArgumentNullException } from "../../errors/errors";

export default class NewUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
	deleted?: boolean;

    constructor(firstName: string, lastName: string, username: string, email: string, deleted?: boolean) {
        if (!firstName) {
            throw new ArgumentNullException("firstName");
        }
        this.firstName = firstName;

        if (!lastName) {
            throw new ArgumentNullException("lastName");
        }
        this.lastName = lastName;

        if (!username) {
            throw new ArgumentNullException("username");
        }
        this.username = username;

        if (!email) {
            throw new ArgumentNullException("email");
        }
        this.email = email;

        this.deleted = deleted
    }
}