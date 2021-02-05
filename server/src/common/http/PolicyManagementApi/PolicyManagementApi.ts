import axios, { CancelToken } from "axios";
import { Guid } from "guid-typescript";
import axiosHelper from "../../../common/helpers/AxiosHelper";
import PaginationModel from "../../../common/models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/PaginationModel/PaginationModel";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { PolicyHistory } from "../../../common/models/PolicyManagementService/PolicyHistory/PolicyHistory";

export default class PolicyManagementApi {
    static getPolicyById = async (
        getPolicyByIdUrl: string,
        policyId: Guid,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }): Promise<string> => {

        const url = `${getPolicyByIdUrl}?id=${policyId.toString()}`;

        const response = await axios.get(url, {
            headers,
            cancelToken: cancellationToken
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static getPolicy = async (
        getPolicyUrl: string,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }): Promise<Policy> => {

        const response = await axios.get(getPolicyUrl, {
            headers,
            cancelToken: cancellationToken
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static saveDraftPolicy = async (
        saveDraftPolicyUrl: string,
        draftPolicy: Policy,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }): Promise<void> => {

        const response = await axios.put(saveDraftPolicyUrl, JSON.stringify(draftPolicy), {
            headers,
            cancelToken: cancellationToken
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static publishPolicy = async (publishPolicyUrl: string, policyId: Guid, headers?: { [header: string]: string }): Promise<void> => {
        const url = `${publishPolicyUrl}?id=${policyId.toString()}`;

        const response = await axios.put(url, {
            headers
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static distributeAdaptationPolicy = async (distributeAdaptationPolicyUrl: string, headers?: { [header: string]: string }): Promise<void> => {
        const response = await axios.put(distributeAdaptationPolicyUrl, {
            headers
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static distributeNcfsPolicy = async (distributeNcfsPolicyUrl: string, headers?: { [header: string]: string }): Promise<void> => {
        const response = await axios.put(distributeNcfsPolicyUrl, {
            headers
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static deleteDraftPolicy = async (
        deleteDraftPolicyUrl: string,
        policyId: Guid,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }): Promise<void> => {
        const url = `${deleteDraftPolicyUrl}?id=${policyId.toString()}`;

        const response = await axios.delete(url, {
            headers,
            cancelToken: cancellationToken
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error(response.statusText);
        }

        return response.data;
    }

    static getPolicyHistory = async (
        getPolicyHistoryUrl: string,
        cancellationToken: CancelToken,
        headers?: { [header: string]: string }
    ): Promise<PolicyHistory> => {
        const response = await axios.get(getPolicyHistoryUrl, {
            headers,
            cancelToken: cancellationToken
        });

        if (response.status < 200 || response.status > 299) {
            throw new Error(response.statusText);
        }

        return response.data;
    };

    static getPaginatedPolicyHistory = async (
        getPaginatedPolicyHistoryUrl: string,
        pagination: PaginationModel,
        cancellationToken: CancelToken
    ): Promise<PolicyHistory> => {
        return await axiosHelper(getPaginatedPolicyHistoryUrl, "POST", cancellationToken, { pagination });
    }
}