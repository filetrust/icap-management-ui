import axios, { CancelToken } from "axios";
import axiosHelper from "../../../common/helpers/AxiosHelper";
import { GetMetricsResponse } from "../../../common/models/TransactionEventService/GetMetrics";
import { FileType } from "../../../common/models/enums/FileType";
import { Risk } from "../../../common/models/enums/Risk";

export interface File {
    timestamp: Date,
    fileId: string,
    detectionFileType: FileType,
    risk: Risk,
    activePolicyId: string,
    directory: string
}

export default class TransactionEventApi {
    static getTransactions = async (
        getTransactionsUrl: string,
        body: any,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<{ count: number, files: File[] }> => {
        const response = await axios.post(
            getTransactionsUrl,
            JSON.stringify(body),
            {
                data: JSON.stringify(body),
                headers,
                cancelToken: cancellationToken
            }
        );

        if (response.statusText !== "OK") {
            throw new Error(response.statusText);
        }

        return response.data;
    };

    static getTransactionDetails = async (
        getTransactionDetailsUrl: string,
        transactionFilePath: string,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<{ status: number, analysisReport: string }> => {
        const url = `${getTransactionDetailsUrl}?filePath=${transactionFilePath}`;

        const response = await axios.get(
            url,
            {
                headers,
                cancelToken: cancellationToken
            }
        );

        if (response.statusText !== "OK") {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static getMetrics = (
        getMetricsUrl: string,
        fromDate: Date,
        toDate: Date,
        cancellationToken: CancelToken
    ): Promise<GetMetricsResponse> => {
        const url = `${getMetricsUrl}?fromDate=${fromDate}&toDate=${toDate}`;

        return axiosHelper(url, "GET", cancellationToken);
    }
}