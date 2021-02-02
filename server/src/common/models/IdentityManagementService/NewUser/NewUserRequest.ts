import { ArgumentNullException } from "../../errors/errors";
import NewUser from "./NewUser";

export class NewUserRequest {
    url: string;
    newUser: NewUser;

    constructor(url: string, newUser: NewUser) {
        if (!url) {
            throw new ArgumentNullException("url");
        }
        this.url = url;

        this.newUser = new NewUser(
            newUser.firstName,
            newUser.lastName,
            newUser.username.toLowerCase(),
            newUser.email.toLowerCase()
        );
    }
}