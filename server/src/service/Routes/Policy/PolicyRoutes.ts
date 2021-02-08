import { Express } from "express";
import { Logger } from "winston";
import axios from "axios";
import IConfig from "../../../common/models/IConfig";
import handleCancellation from "../../../common/helpers/HandleCancellation";
import { Guid } from "guid-typescript";
import PolicyManagementService from "../../../business/services/PolicyManagementService/PolicyManagementService";
import { GetPolicyByIdRequest } from "../../../common/models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import handleError from "../../../common/helpers/HandleError";
import { GetPaginatedPolicyHistoryRequest } from "../../../common/models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/GetPaginatedPolicyHistoryRequest";
import PaginationModel from "../../../common/models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/PaginationModel/PaginationModel";

class PolicyRoutes {
    cancellationMessage: string = "Request Cancelled by the Client";

    policyManagementServiceBaseUrl: string;
    getPolicyPath: string;
    deletePolicyPath: string;
    getDraftPolicyPath: string;
    saveDraftPolicyPath: string;
    getCurrentPolicyPath: string;
    getPolicyHistoryPath: string;
    getPaginatedPolicyHistoryPath: string;
    publishPolicyPath: string;
    distributeAdaptationPolicyPath: string;
    distributeNcfsPolicyPath: string;

    policyManagementService: PolicyManagementService;

    app: Express;
    logger: Logger;

    constructor(config: IConfig, app: Express, logger: Logger) {
        this.policyManagementServiceBaseUrl = config.policy.policyManagementServiceBaseUrl;
        this.getPolicyPath = config.policy.getPolicyPath;
        this.deletePolicyPath = config.policy.deletePolicyPath;
        this.getDraftPolicyPath = config.policy.getDraftPolicyPath;
        this.saveDraftPolicyPath = config.policy.saveDraftPolicyPath;
        this.getCurrentPolicyPath = config.policy.getCurrentPolicyPath;
        this.getPolicyHistoryPath = config.policy.getPolicyHistoryPath;
        this.getPaginatedPolicyHistoryPath = config.policy.getPaginatedPolicyHistoryPath;
        this.publishPolicyPath = config.policy.publishPolicyPath;
        this.distributeAdaptationPolicyPath = config.policy.distributeAdaptionPolicyPath;
        this.distributeNcfsPolicyPath = config.policy.distributeNcfsPolicyPath;
        this.policyManagementService = new PolicyManagementService(logger);
        this.app = app;
        this.logger = logger;
    }

    setup = async () => {
        // Get Policy
        this.app.get("/policy/getPolicy/:policyId", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.getPolicyPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                const getPolicyRequest = new GetPolicyByIdRequest(requestUrl, Guid.parse(req.params.policyId));

                const policy = await this.policyManagementService.getPolicy(getPolicyRequest, cancellationTokenSource.token);

                res.json(policy);
            }
            catch (error) {
                if (error.stack) {
                    const message = "Error Retrieving Policy";
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });

        // Get Current Policy
        this.app.get("/policy/current", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.getCurrentPolicyPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                const policy = await this.policyManagementService.getCurrentPolicy(
                    requestUrl, cancellationTokenSource.token);

                res.json(policy);
            }
            catch (error) {
                if (error.stack) {
                    const message = "Error Retrieving The Currently Published Policy";
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });

        // Get Draft Policy
        this.app.get("/policy/draft", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.getDraftPolicyPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                const policy = await this.policyManagementService.getDraftPolicy(requestUrl, cancellationTokenSource.token);

                res.json(policy);
            }
            catch (error) {
                if (error.stack) {
                    const message = "Error Retrieving the Draft Policy";
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });

        // Save Draft Policy
        this.app.put("/policy/draft", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.saveDraftPolicyPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                await this.policyManagementService.saveDraftPolicy(requestUrl, req.body, cancellationTokenSource.token);

                res.sendStatus(200);
            }
            catch (error) {
                if (error.stack) {
                    const message = "Error Updating the Draft Policy";
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });

        // Publish Policy
        this.app.put("/policy/publish/:policyId", async (req, res) => {
            const publishUrl = this.policyManagementServiceBaseUrl + this.publishPolicyPath;
            const distributeAdaptationUrl = this.policyManagementServiceBaseUrl + this.distributeAdaptationPolicyPath;
            const distributeNcfsUrl = this.policyManagementServiceBaseUrl + this.distributeNcfsPolicyPath;

            try {
                await this.policyManagementService.publishPolicy(
                    publishUrl, distributeAdaptationUrl, distributeNcfsUrl, Guid.parse(req.params.policyId));

                res.sendStatus(200);
            }
            catch (error) {
                const message = `Error Publishing Policy - PolicyId: ${req.params.policyId}`;
                this.logger.error(message + error.stack);
                res.status(500).json(message);
            }
        });

        // Delete Draft Policy
        this.app.delete("/policy/draft/:policyId", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.deletePolicyPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                await this.policyManagementService.deleteDraftPolicy(
                    requestUrl, Guid.parse(req.params.policyId), cancellationTokenSource.token);

                res.sendStatus(200);
            }
            catch (error) {
                if (error.stack) {
                    const message = `Error Deleting Policy - PolicyId: ${req.params.policyId}`;
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });

        // Get Policy History
        this.app.get("/policy/history", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.getPolicyHistoryPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                const policyHistory = await this.policyManagementService.getPolicyHistory(requestUrl, cancellationTokenSource.token);

                res.json(policyHistory);
            }
            catch (error) {
                if (error.stack) {
                    const message = "Error Retrieving Policy History";
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });

        // Get Policy History with Pagination
        this.app.post("/policy/history", async (req, res) => {
            const requestUrl = this.policyManagementServiceBaseUrl + this.getPaginatedPolicyHistoryPath;

            const cancellationTokenSource = axios.CancelToken.source();
            handleCancellation(req, cancellationTokenSource, this.cancellationMessage);

            try {
                const pagination = new PaginationModel(req.body.pagination.zeroBasedIndex, req.body.pagination.pageSize);
                const getPolicyHistoryRequest = new GetPaginatedPolicyHistoryRequest(requestUrl, pagination);

                const policyHistory = await this.policyManagementService.getPaginatedPolicyHistory(
                    getPolicyHistoryRequest, cancellationTokenSource.token);

                res.json(policyHistory);
            }
            catch (error) {
                if (error.stack) {
                    const message = "Error Retrieving Policy History";
                    this.logger.error(message + error.stack);
                    res.status(500).json(message);
                }
            }
        });
    }
}

export default PolicyRoutes;