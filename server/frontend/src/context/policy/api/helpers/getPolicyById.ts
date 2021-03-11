import { CancelToken } from "axios";
import axiosRequestHelper from "../../../../helpers/axiosRequestHelper";
import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export const getPolicyById = (baseUrl: string, policyId: string, cancellationToken: CancelToken): Promise<Policy> => {
	return axiosRequestHelper(baseUrl, "POST", cancellationToken, { policyId });
};