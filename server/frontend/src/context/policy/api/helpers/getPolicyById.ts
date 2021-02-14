import axios, { CancelToken } from "axios";
import { Policy } from "../../../../../../src/common/models/PolicyManagementService/Policy/Policy";

export const getPolicyById = async (baseUrl: string, policyId: string, cancellationToken: CancelToken): Promise<Policy> => {
    const url = `${baseUrl}?policyId=${policyId}`;

    const response = await axios(url, {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
        cancelToken: cancellationToken
    });

    if (response.status < 200 || response.status > 299) {
        throw response.statusText;
    }

    return response.data;
}