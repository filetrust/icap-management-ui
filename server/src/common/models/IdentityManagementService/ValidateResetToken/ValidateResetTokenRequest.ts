import { ArgumentNullException } from "../../errors/errors";

export class ValidateResetTokenRequest {
    url: string;
    token: string;

    constructor(url: string, token: string) {
        if (!url) {
            throw new ArgumentNullException("url");
        }
        this.url = url;

        if (!token) {
            throw new ArgumentNullException("token");
        }
        this.token = token;
    }
}