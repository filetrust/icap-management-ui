import fetch from "node-fetch";

export default class TransactionEventApi {
    static getTransactions = async (getTransactionsUrl: string, body: any, headers?: { [header: string]: string }): Promise<string> => {
        const response = await fetch(`${getTransactionsUrl}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }

        return response.text();
    };

    static getTransactionDetails = async (getTransactionDetailsUrl: string, transactionFilePath: string, headers?: { [header: string]: string }): Promise<string> => {
        const url = `${getTransactionDetailsUrl}?filePath=${transactionFilePath}`;

        const response = await fetch(url, {
            method: "GET",
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }

        return response.text();

        // return new Promise<string>((resolve) => resolve(JSON.stringify(analysisReport))); // TODO: Remove once we have analysis reports in test data
    }
}