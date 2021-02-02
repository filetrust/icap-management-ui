import { CancelToken } from "axios";
import { getPolicy } from "./helpers";
import { Policy } from "../../../../../src/common/models/PolicyManagementService/Policy/Policy";
import Routes from "../../../Routes";
import { Guid } from "guid-typescript";
import { PolicyHistory } from "../../../../../src/common/models/PolicyManagementService/PolicyHistory/PolicyHistory";
import axiosRequestHelper from "../../../helpers/axiosRequestHelper";

const routes = new Routes().policyRoutes;

export const getCurrentPolicy = async (cancellationToken: CancelToken): Promise<Policy> => {
    return await getPolicy(routes.getCurrentPolicyRoute, cancellationToken);
}

export const getDraftPolicy = async (cancellationToken: CancelToken): Promise<Policy> => {
    return await getPolicy(routes.getDraftPolicyRoute, cancellationToken);
}

export const saveDraftPolicy = async (policy: Policy, cancellationToken: CancelToken): Promise<void> => {
    return await axiosRequestHelper(routes.saveDraftPolicyRoute, "PUT", cancellationToken, policy);
}

export const publishPolicy = async (policyId: Guid, cancellationToken: CancelToken): Promise<void> => {
    const url = `${routes.publishPolicyRoute}/${policyId.toString()}`;

    return await axiosRequestHelper(url, "PUT", cancellationToken);
}

export const deleteDraftPolicy = async (policyId: Guid, cancellationToken: CancelToken): Promise<void> => {
    const url = `${routes.deletePolicyRoute}/${policyId.toString()}`;

    return await axiosRequestHelper(url, "DELETE", cancellationToken);
}

export const getPolicyHistory = async (cancellationToken: CancelToken): Promise<PolicyHistory> => {
    return await axiosRequestHelper(routes.getPolicyHistory, "GET", cancellationToken);
}