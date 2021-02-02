import { ArgumentException } from "../../errors/errors";
import { ArgumentNullException } from "../../errors/errors";

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

        if (password.length < 6) {
            throw new ArgumentException("password", "The new password cannot be less than 6 characters.");
        }
        this.password = password;
    }
}