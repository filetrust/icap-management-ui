import { CancelToken } from "axios";
import Routes from "../../../Routes";
import { Filter } from "../../../../../src/common/models/TransactionEventService/GetTransactions/GetTransactionsRequest";
import { GetTransactionsResponse } from "../../../../../src/common/models/TransactionEventService/GetTransactions";
import axiosRequestHelper from "../../../helpers/axiosRequestHelper";

const requestHistoryRoutes = new Routes().requestHistoryRoutes;

export const getTransactions = async (
    body: Filter,
    cancellationToken: CancelToken
): Promise<GetTransactionsResponse> => {

    return axiosRequestHelper(
        requestHistoryRoutes.getTransactionsRoute, "POST", cancellationToken, { Filter: body });

};