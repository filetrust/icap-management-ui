import { ArgumentNullException } from "../errors/errors";

export default class ValidationResponse {
    message: string;

    constructor(message: string) {
        if (!message) {
            throw new ArgumentNullException("message");
        }
        this.message = message;
    }
}