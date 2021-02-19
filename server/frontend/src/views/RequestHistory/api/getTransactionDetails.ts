import { CancelToken } from "axios";
import axiosRequestHelper from "../../../helpers/axiosRequestHelper";
import Routes from "../../../Routes";

const routes = new Routes().requestHistoryRoutes;

export const getTransactionDetails = async (transactionFilePath: string, cancellationToken: CancelToken): Promise<string> => {
	return axiosRequestHelper(routes.getTransactionDetailsRoute, "POST", cancellationToken, { transactionFilePath });
};