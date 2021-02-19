import { CancelToken } from "axios";
import axiosRequestHelper from "../../../../helpers/axiosRequestHelper";
import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export const getPolicy = async (baseUrl: string, cancellationToken: CancelToken): Promise<Policy> => {
	return axiosRequestHelper(baseUrl, "GET", cancellationToken);
};