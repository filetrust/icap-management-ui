import { Logger } from "winston";
import { Guid } from "guid-typescript";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { GetPolicyByIdRequest } from "../../../common/models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import { PolicyHistory } from "../../../common/models/PolicyManagementService/PolicyHistory/PolicyHistory";
import { GetPaginatedPolicyHistoryRequest } from "../../../common/models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/GetPaginatedPolicyHistoryRequest";

import IPolicyManagementService from "../../../common/services/IPolicyManagementService";
import PolicyManagementApi from "../../../common/http/PolicyManagementApi/PolicyManagementApi";
import { CancelToken } from "axios";

class PolicyManagementService implements IPolicyManagementService {
    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    createPolicyModel = (policyJSON: any): Policy => {
        return new Policy(
            policyJSON.id,
            policyJSON.policyType,
            policyJSON.published,
            policyJSON.lastEdited,
            policyJSON.created,
            policyJSON.ncfsPolicy,
            policyJSON.adaptionPolicy,
            policyJSON.updatedBy
        );
    }

    getPolicy = async (request: GetPolicyByIdRequest, cancellationToken: CancelToken) => {
        let policy: Policy;

        try {
            this.logger.info(`Retrieving Policy from the PolicyManagementServie - PolicyId: ${request.policyId}`);

            const response = await PolicyManagementApi.getPolicyById(
                request.url, request.policyId, cancellationToken, { "Content-Type": "application/json" });
            policy = this.createPolicyModel(response);

            if (policy) {
                this.logger.info(`Retrieved Policy - PolicyId: ${request.policyId}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Policy: ${error}`);
            throw error;
        }

        return policy;
    }

    getCurrentPolicy = async (getCurrentPolicyUrl: string, cancellationToken: CancelToken) => {
        let policy: Policy;

        try {
            this.logger.info("Retrieving Current Policy from the PolicyManagementService");

            const response = await PolicyManagementApi.getPolicy(
                getCurrentPolicyUrl, cancellationToken, { "Content-Type": "application/json" });
            policy = this.createPolicyModel(response);

            if (policy) {
                this.logger.info(`Retrieved Current Policy - PolicyId: ${policy.id}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Current Policy: ${error}`);
            throw error;
        }

        return policy;
    }

    getDraftPolicy = async (getDraftPolicyUrl: string, cancellationToken: CancelToken) => {
        let policy: Policy;

        try {
            this.logger.info("Retrieving Draft Policy from the PolicyManagementService");

            const response = await PolicyManagementApi.getPolicy(
                getDraftPolicyUrl, cancellationToken, { "Content-Type": "application/json" });
            policy = this.createPolicyModel(response);

            if (policy) {
                this.logger.info(`Retrieved Draft Policy - PolicyId: ${policy.id}`);
            }
        }
        catch (error) {
            this.logger.error(`Could not get Draft Policy: ${error}`);
            throw error;
        }

        return policy;
    }

    saveDraftPolicy = async (updatePolicyUrl: string, draftPolicy: Policy, cancellationToken: CancelToken) => {
        try {
            this.logger.info(
                `Saving Draft Policy to the PolicyManagementService - PolicyId: ${draftPolicy.id}`);

            await PolicyManagementApi.saveDraftPolicy(
                updatePolicyUrl, draftPolicy, cancellationToken, { "Content-Type": "application/json" });

            this.logger.info(
                `Saved Draft Policy to the PolicyManagementService - PolicyId: ${draftPolicy.id}`)
        }
        catch (error) {
            this.logger.error(`Couldn't save Draft Policy: ${error}`);
            throw error;
        }
    }

    publishPolicy = async (publishPolicyUrl: string, distributeAdaptationPolicyUrl: string, distributeNcfsPolicyUrl: string, policyId: Guid) => {
        const headers = { "Content-Type": "application/json" };

        try {
            this.logger.info(`Publishing Policy - PolicyId: ${policyId}`);
            // await PolicyManagementApi.publishPolicy(publishPolicyUrl, policyId, headers);

            // this.logger.info(`Attempting to Distribute Adaptation Policy - PolicyId: ${policyId}`);
            // await PolicyManagementApi.distributeAdaptationPolicy(distributeAdaptationPolicyUrl, headers);

            // this.logger.info(`Attempting to Distribute NCFS Policy - PolicyId: ${policyId}`);
            // await PolicyManagementApi.distributeNcfsPolicy(distributeNcfsPolicyUrl, headers);

            const requestChain = [
                PolicyManagementApi.publishPolicy(publishPolicyUrl, policyId, headers),
                PolicyManagementApi.distributeAdaptationPolicy(distributeAdaptationPolicyUrl, headers),
                PolicyManagementApi.distributeNcfsPolicy(distributeNcfsPolicyUrl, headers)
            ];

            await Promise.all(requestChain);

            this.logger.info(`Published Policy - PolicyId: ${policyId}`);
        }
        catch (error) {
            this.logger.error(`Couldn't Publish Policy - PolicyId: ${policyId}`);
            throw error;
        }
    }

    deleteDraftPolicy = async (deleteDraftPolicyUrl: string, policyId: Guid, cancellationToken: CancelToken) => {
        try {
            this.logger.info(`Deleting Policy - PolicyId: ${policyId}`);

            await PolicyManagementApi.deleteDraftPolicy(
                deleteDraftPolicyUrl, policyId, cancellationToken, { "Content-Type": "application/json" });

            this.logger.info(`Deleted Policy - PolicyId: ${policyId}`);
        }
        catch (error) {
            this.logger.error(`Couldn't Delete Policy: ${error}`);
            throw error;
        }
    }

    getPolicyHistory = async (getPolicyHistoryUrl: string, cancellationToken: CancelToken) => {
        let policyHistory: PolicyHistory;

        try {
            this.logger.info(`Retrieving Policy History from the PolicyManagementService`);

            const response = await PolicyManagementApi.getPolicyHistory(getPolicyHistoryUrl, cancellationToken);
            policyHistory = new PolicyHistory(response.policiesCount, response.totalPolicies, response.policies);

            this.logger.info(`Retrieved Policy History from the PolicyManagementService`);
        }
        catch (error) {
            this.logger.error(`Couldn't Retrieve Policy History: ${error}`);
            throw error;
        }

        return policyHistory;
    }

    getPaginatedPolicyHistory = async (request: GetPaginatedPolicyHistoryRequest, cancellationToken: CancelToken) => {
        let policyHistory: PolicyHistory;

        try {
            this.logger.info(`Retrieving Policy History from the PolicyManagementService`);

            const response = await PolicyManagementApi.getPaginatedPolicyHistory(
                request.url, request.pagination, cancellationToken);

            policyHistory = new PolicyHistory(response.policiesCount, response.totalPolicies, response.policies);

            this.logger.info(`Retrieved Policy History from the PolicyManagementService`);
        }
        catch (error) {
            this.logger.error(`Couldn't Retrieve Policy History: ${error}`);
            throw error;
        }

        return policyHistory;
    };
}

export default PolicyManagementService;