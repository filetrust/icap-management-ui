import { ArgumentNullException } from "../../errors/errors";

export class ForgotPasswordRequest {
    url: string;
    username: string;

    constructor(url: string, username: string) {
        if (!url) {
            throw new ArgumentNullException("url");
        }
        this.url = url;

        if (!username) {
            throw new ArgumentNullException("username");
        }
        this.username = username;
    }
}