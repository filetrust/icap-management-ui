import validatePassword from "../ValidatePassword";
import { ArgumentNullException } from "../../errors/errors";

export class AuthenticateRequest {
    url: string;
    username: string;
    password: string;

    constructor(url: string, username: string, password: string) {
        if (!url) {
            throw new ArgumentNullException("url");
        }
        this.url = url;

        if (!username) {
            throw new ArgumentNullException("username");
        }
        this.username = username;

        validatePassword(password);
        this.password = password;
    }
}