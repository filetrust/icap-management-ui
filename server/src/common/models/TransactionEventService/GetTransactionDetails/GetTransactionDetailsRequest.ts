import { ArgumentNullException } from "../../errors/errors";

export class GetTransactionDetailsRequest {
    url: string;
    transactionFileDirectory: string;

    constructor(url: string, transactionFileDirectory: string) {
        if (!url) {
            throw new ArgumentNullException("url");
        }

        if (!transactionFileDirectory) {
            throw new ArgumentNullException("transactionFileDirectory");
        }

        this.url = url;
        this.transactionFileDirectory = transactionFileDirectory;
    }
}