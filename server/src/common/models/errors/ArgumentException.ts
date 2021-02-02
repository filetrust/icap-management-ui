export class ArgumentException extends Error {
    argument: string;

    constructor(argument: string, message: string) {
        super(`Argument is invalid: '${argument}'. ${message}`);
        this.name = "ArgumentException";
        this.argument = argument;
    }
}