import { ArgumentException } from "../../errors/errors";
import { ArgumentNullException } from "../../errors/errors";
import validatePassword from "../ValidatePassword";

export class ResetPasswordRequest {
    url: string;
    token: string;
    password: string;

    constructor(url: string, token: string, password: string) {
        if (!url) {
            throw new ArgumentNullException("url");
        }
        this.url = url;

        if (!token) {
            throw new ArgumentNullException("token");
        }
        this.token = token;

        if (!password) {
            throw new ArgumentNullException("password");
        }

        validatePassword(password);
        this.password = password;
    }
}