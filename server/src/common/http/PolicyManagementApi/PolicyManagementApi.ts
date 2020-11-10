import { Guid } from "guid-typescript";
import fetch from "node-fetch";

export default class PolicyManagementApi {
    static getPolicy = async (getPolicyUrl: string, policyId: Guid, headers?: { [header: string]: string }): Promise<string> => {
        const url = `${getPolicyUrl}?id=${policyId.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers
        });

        if (!response.ok) {
            throw response.statusText;
        }

        return response.text();
    }
}