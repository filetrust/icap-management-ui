import { Logger } from "winston";
import ITransactionEventService from "../../../common/services/ITransactionEventService";
import { GetTransactionsRequest, GetTransactionsResponse } from "../../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsRequest, GetTransactionDetailsResponse } from "../../../common/models/TransactionEventService/GetTransactionDetails";
import TransactionEventApi from "../../../common/http/TransactionEventApi/TransactionEventApi";
import { CancelToken } from "axios";

class TransactionEventService implements ITransactionEventService {
    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    getTransactions = async (request: GetTransactionsRequest, cancellationToken: CancelToken) => {
        let transactions: GetTransactionsResponse;

        try {
            this.logger.info("Retrieving Transactions from the TransactionEventService");

            const transactionsResponse = await TransactionEventApi.getTransactions(request.url, request.body, cancellationToken, { "Content-Type": "application/json" });
            transactions = new GetTransactionsResponse(transactionsResponse.count, transactionsResponse.files);

            if (transactions) {
                this.logger.info(`Retrieved ${transactions.count} Transactions: ${JSON.stringify(transactionsResponse)}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Transactions: ${error}`);
            throw error;
        }

        return transactions;
    };

    getTransactionDetails = async (request: GetTransactionDetailsRequest, cancellationToken: CancelToken) => {
        let transactionDetails: GetTransactionDetailsResponse;

        try {
            this.logger.info(`Retrieving Transaction Details from the TransactionEventService - Directory: ${request.transactionFileDirectory}`);

            const response = await TransactionEventApi.getTransactionDetails(
                request.url, request.transactionFileDirectory, cancellationToken, { "Content-Type": "application/json" });

            transactionDetails = new GetTransactionDetailsResponse(response.status, response.analysisReport);

            if (transactionDetails) {
                this.logger.info(`Retrieved Transaction Details from file: ${request.transactionFileDirectory}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Transaction Details: ${error}`);
            throw error;
        }

        return transactionDetails;
    }
}

export default TransactionEventService;