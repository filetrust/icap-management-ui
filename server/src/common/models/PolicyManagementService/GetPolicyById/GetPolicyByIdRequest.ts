import { ArgumentNullException } from "../../errors/errors";

export class GetPolicyByIdRequest {
    url: string;
    policyId: string;

    constructor(url: string, policyId: string) {
        if (!url) {
            throw new ArgumentNullException("url");
        }

        if (!policyId) {
            throw new ArgumentNullException("policyId");
        }

        this.url = url;
        this.policyId = policyId;
    }
}