import { Guid } from "guid-typescript";
import { Logger } from "winston";
import { CancelToken } from "axios";
import { GetPolicyByIdRequest } from "../models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import { Policy } from "../models/PolicyManagementService/Policy/Policy";
import { PolicyHistory } from "../models/PolicyManagementService/PolicyHistory/PolicyHistory";
import { GetPaginatedPolicyHistoryRequest } from "../models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/GetPaginatedPolicyHistoryRequest";

export default interface IPolicyManagementService {
    logger: Logger,
    getPolicy: (request: GetPolicyByIdRequest, cancellationToken: CancelToken) => Promise<Policy>,
    getCurrentPolicy: (getCurrentPolicyUrl: string, cancellationToken: CancelToken) => Promise<Policy>,
    getDraftPolicy: (getDraftPolicyUrl: string, cancellationToken: CancelToken) => Promise<Policy>,
    saveDraftPolicy: (saveDraftPolicyUrl: string, draftPolicy: Policy, cancellationToken: CancelToken) => Promise<void>,
    publishPolicy: (publishPolicyUrl: string, distributeAdaptationPolicyUrl: string, distributeNcfsPolicy: string, policyId: Guid) => Promise<void>,
    deleteDraftPolicy: (deleteDraftPolicyUrl: string, policyId: Guid, cancellationToken: CancelToken) => Promise<void>,
    getPolicyHistory: (getPolicyHistoryUrl: string, cancellationToken: CancelToken) => Promise<PolicyHistory>,
    getPaginatedPolicyHistory: (request: GetPaginatedPolicyHistoryRequest, cancellationToken: CancelToken) => Promise<PolicyHistory>
}