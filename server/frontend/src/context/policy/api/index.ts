import { CancelToken } from "axios";
import { getPolicy } from "./helpers";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import Routes from "../../../Routes";
import { Guid } from "guid-typescript";
import { PolicyHistory } from "../../../../../src/common/models/PolicyManagementService/PolicyHistory/PolicyHistory";
import axiosRequestHelper from "../../../helpers/axiosRequestHelper";
import PaginationModel from "../../../../../src/common/models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/PaginationModel/PaginationModel";

const routes = new Routes().policyRoutes;

export const getCurrentPolicy = (cancellationToken: CancelToken): Promise<Policy> => {
	return getPolicy(routes.getCurrentPolicyRoute, cancellationToken);
};

export const getDraftPolicy = (cancellationToken: CancelToken): Promise<Policy> => {
	return getPolicy(routes.getDraftPolicyRoute, cancellationToken);
};

export const saveDraftPolicy = (policy: Policy, cancellationToken: CancelToken): Promise<void> => {
	return axiosRequestHelper(routes.saveDraftPolicyRoute, "PUT", cancellationToken, policy);
};

export const publishPolicy = (policyId: Guid, cancellationToken: CancelToken): Promise<void> => {
	const url = `${routes.publishPolicyRoute}/${policyId.toString()}`;

	return axiosRequestHelper(url, "PUT", cancellationToken);
};

export const deleteDraftPolicy = (policyId: Guid, cancellationToken: CancelToken): Promise<void> => {
	const url = `${routes.deletePolicyRoute}/${policyId.toString()}`;

	return axiosRequestHelper(url, "DELETE", cancellationToken);
};

export const getPolicyHistory = (cancellationToken: CancelToken): Promise<PolicyHistory> => {
	return axiosRequestHelper(routes.getPolicyHistory, "GET", cancellationToken);
};

export const getPaginatedPolicyHistory = (pagination: PaginationModel, cancellationToken: CancelToken) => {
	return axiosRequestHelper(routes.getPaginatedPolicyHistoryPath, "POST", cancellationToken, { pagination });
};