import "jest-extended";
import { stub, SinonStub } from "sinon";
import winston from "winston";
import axios, { CancelToken } from "axios";
import { Guid } from "guid-typescript";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { GetPolicyByIdRequest } from "../../../common/models/PolicyManagementService/GetPolicyById/GetPolicyByIdRequest";
import { PolicyHistory } from "../../../common/models/PolicyManagementService/PolicyHistory/PolicyHistory";

import PolicyManagementService from "./PolicyManagementService";
import PolicyManagementApi from "../../../common/http/PolicyManagementApi/PolicyManagementApi";

import policyExample from "../../../common/http/PolicyManagementApi/policyExample.json";
import PaginationModel from "../../../common/models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/PaginationModel/PaginationModel";
import { GetPaginatedPolicyHistoryRequest } from "../../../common/models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/GetPaginatedPolicyHistoryRequest";

let getPolicyByIdStub: SinonStub;
let getPolicyStub: SinonStub;

let cancellationToken: CancelToken;

const setupGetPolicyTest = () => {
    const policy = new Policy(
        policyExample.id,
        policyExample.policyType,
        policyExample.published,
        policyExample.lastEdited,
        policyExample.created,
        policyExample.ncfsPolicy,
        policyExample.adaptionPolicy,
        policyExample.updatedBy
    );

    beforeEach(() => {
        cancellationToken = axios.CancelToken.source().token;

        getPolicyStub = stub(PolicyManagementApi, "getPolicy")
            .resolves(policy);
    });

    afterEach(() => {
        getPolicyStub.restore();
    });
};

const expectedGetPolicyResponse = new Policy(
    policyExample.id,
    policyExample.policyType,
    policyExample.published,
    policyExample.lastEdited,
    policyExample.created,
    policyExample.ncfsPolicy,
    policyExample.adaptionPolicy,
    policyExample.updatedBy
);

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.cli()
        })
    ]
});

describe("PolicyManagementService", () => {
    describe("constructor", () => {
        it("should_construct_with_valid_arguments", () => {
            // Act
            const policyManagementService = new PolicyManagementService(logger);

            // Assert
            expect(policyManagementService.logger).toEqual(logger);
        });
    });

    describe("getPolicy", () => {
        const responseString = policyExample;

        beforeEach(() => {
            const cancellationTokenSource = axios.CancelToken.source();
            cancellationToken = cancellationTokenSource.token;

            getPolicyByIdStub = stub(PolicyManagementApi, "getPolicyById")
                .resolves(responseString);
        });

        afterEach(() => {
            getPolicyByIdStub.restore();
        });

        it("returns_correct_response", async () => {
            // Arrange
            const policyManagementService = new PolicyManagementService(logger);
            const request = new GetPolicyByIdRequest("www.glasswall.com", "id");

            // Act
            const result = await policyManagementService.getPolicy(request, cancellationToken);

            // Assert
            expect(result).toEqual(expectedGetPolicyResponse);
        });
    });

    describe("getCurrentPolicy", () => {
        setupGetPolicyTest();

        it("returns_correct_response", async () => {
            // Arrange
            const policyManagementService = new PolicyManagementService(logger);
            const getCurrentPolicyUrl = "www.glasswall.com";

            // Act
            const result = await policyManagementService.getCurrentPolicy(getCurrentPolicyUrl, cancellationToken);

            // Assert
            expect(result).toEqual(expectedGetPolicyResponse);
        });
    });

    describe("getDraftPolicy", () => {
        setupGetPolicyTest();

        it("returns_correct_response", async () => {
            // Arrange
            const policyManagementService = new PolicyManagementService(logger);
            const getDraftPolicyUrl = "www.glasswall.com";

            // Act
            const result = await policyManagementService.getDraftPolicy(getDraftPolicyUrl, cancellationToken);

            // Assert
            expect(result).toEqual(expectedGetPolicyResponse);
        });
    });

    describe("saveDraftPolicy", () => {
        let saveDraftPolicyStub: SinonStub;

        const saveDraftPolicyUrl = "www.glasswall.com";
        const draftPolicy = new Policy(
            policyExample.id,
            policyExample.policyType,
            policyExample.published,
            policyExample.lastEdited,
            policyExample.created,
            policyExample.ncfsPolicy,
            policyExample.adaptionPolicy,
            policyExample.updatedBy
        );
        const expectedHeaders = { "Content-Type": "application/json" };

        beforeEach(() => {
            const cancellationTokenSource = axios.CancelToken.source();
            cancellationToken = cancellationTokenSource.token;

            saveDraftPolicyStub = stub(PolicyManagementApi, "saveDraftPolicy")
                .resolves();
        });

        afterEach(() => {
            saveDraftPolicyStub.restore();
        });

        it("called_PolicyManagementApi_saveDraftPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "saveDraftPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.saveDraftPolicy(
                saveDraftPolicyUrl, draftPolicy, cancellationToken);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(saveDraftPolicyUrl, draftPolicy, cancellationToken, expectedHeaders);
        });
    });

    describe("publishPolicy", () => {
        const publishPolicyUrl = "www.glasswall.com";
        const distributeAdaptationPolicyUrl = "www.glasswall.com/adaptation";
        const distributeNcfsPolicyUrl = "www.glasswall.com/ncfs";
        const policyId = Guid.create();
        const expectedHeaders = { "Content-Type": "application/json" };

        stub(PolicyManagementApi, "publishPolicy")
            .resolves();
        stub(PolicyManagementApi, "distributeAdaptationPolicy")
            .resolves();
        stub(PolicyManagementApi, "distributeNcfsPolicy")
            .resolves();

        it("called_PolicyManagementApi_publishPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "publishPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.publishPolicy(
                publishPolicyUrl, distributeAdaptationPolicyUrl, distributeNcfsPolicyUrl, policyId);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(publishPolicyUrl, policyId, expectedHeaders);
        });

        it("called_PolicyManagementApi_distributeAdaptationPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "distributeAdaptationPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.publishPolicy(
                publishPolicyUrl, distributeAdaptationPolicyUrl, distributeNcfsPolicyUrl, policyId);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(distributeAdaptationPolicyUrl, expectedHeaders);
        });

        it("called_PolicyManagementApi_distributeNcfsPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "distributeNcfsPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.publishPolicy(
                publishPolicyUrl, distributeAdaptationPolicyUrl, distributeNcfsPolicyUrl, policyId);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(distributeNcfsPolicyUrl, expectedHeaders);
        });

        it("called_publish_before_distribute", async () => {
            // Arrange
            const publishSpy = jest.spyOn(PolicyManagementApi, "publishPolicy");
            const distributeAdaptationSpy = jest.spyOn(PolicyManagementApi, "distributeAdaptationPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.publishPolicy(
                publishPolicyUrl, distributeAdaptationPolicyUrl, distributeNcfsPolicyUrl, policyId);

            // Assert
            expect(publishSpy).toHaveBeenCalledBefore(distributeAdaptationSpy as jest.Mock);
        });
    });

    describe("deleteDraftPolicy", () => {
        let deleteDraftPolicyStub: SinonStub;

        const deleteDraftPolicyUrl = "www.glasswall.com";
        const policyId = Guid.create();
        const expectedHeaders = { "Content-Type": "application/json" };

        beforeEach(() => {
            deleteDraftPolicyStub = stub(PolicyManagementApi, "deleteDraftPolicy")
                .resolves();
        });

        afterEach(() => {
            deleteDraftPolicyStub.restore();
        });

        it("called_PolicyManagementApi_deleteDraftPolicy", async () => {
            // Arrange
            const spy = spyOn(PolicyManagementApi, "deleteDraftPolicy");
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            await policyManagementService.deleteDraftPolicy(
                deleteDraftPolicyUrl, policyId, cancellationToken);

            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toBeCalledWith(deleteDraftPolicyUrl, policyId, cancellationToken, expectedHeaders);
        });
    });

    describe("getPolicyHistory", () => {
        let getPolicyHistoryStub: SinonStub;

        const policyHistory = new PolicyHistory(
            1,
            1,
            [new Policy(
                policyExample.id,
                policyExample.policyType,
                policyExample.published,
                policyExample.lastEdited,
                policyExample.created,
                policyExample.ncfsPolicy,
                policyExample.adaptionPolicy,
                policyExample.updatedBy
            )]
        );

        beforeEach(() => {
            const cancellationTokenSource = axios.CancelToken.source();
            cancellationToken = cancellationTokenSource.token;

            getPolicyHistoryStub = stub(PolicyManagementApi, "getPolicyHistory")
                .resolves(policyHistory);
        });

        afterEach(() => {
            getPolicyHistoryStub.restore();
        });

        it("returns_correct_response", async () => {
            // Arrange
            const policyManagementService = new PolicyManagementService(logger);

            // Act
            const result = await policyManagementService.getPolicyHistory("www.glasswall.com", cancellationToken);

            // Assert
            expect(result.policiesCount)
                .toEqual(policyHistory.policiesCount);
            expect(result.policies[0].id)
                .toEqual(policyHistory.policies[0].id);
            expect(result.policies[0].adaptionPolicy)
                .toEqual(policyHistory.policies[0].adaptionPolicy);
            expect(result.policies[0].ncfsPolicy)
                .toEqual(policyHistory.policies[0].ncfsPolicy);
        });
    });

    describe("getPaginatedPolicyHistory", () => {
        let getPolicyHistoryStub: SinonStub;

        const policyHistory = new PolicyHistory(
            1,
            1,
            [new Policy(
                policyExample.id,
                policyExample.policyType,
                policyExample.published,
                policyExample.lastEdited,
                policyExample.created,
                policyExample.ncfsPolicy,
                policyExample.adaptionPolicy,
                policyExample.updatedBy
            )]
        );

        const pagination = new PaginationModel(0, 25);

        beforeEach(() => {
            const cancellationTokenSource = axios.CancelToken.source();
            cancellationToken = cancellationTokenSource.token;

            getPolicyHistoryStub = stub(PolicyManagementApi, "getPaginatedPolicyHistory")
                .resolves(policyHistory);
        });

        afterEach(() => {
            getPolicyHistoryStub.restore();
        });

        it("returns_correct_response", async () => {
            // Arrange
            const policyManagementService = new PolicyManagementService(logger);
            const getPaginatedPolicyHistoryRequest = new GetPaginatedPolicyHistoryRequest(
                "www.glasswall.com", pagination);

            // Act
            const result = await policyManagementService.getPaginatedPolicyHistory(
                getPaginatedPolicyHistoryRequest, cancellationToken);

            // Assert
            expect(result.policiesCount)
                .toEqual(policyHistory.policiesCount);
            expect(result.policies[0].id)
                .toEqual(policyHistory.policies[0].id);
            expect(result.policies[0].adaptionPolicy)
                .toEqual(policyHistory.policies[0].adaptionPolicy);
            expect(result.policies[0].ncfsPolicy)
                .toEqual(policyHistory.policies[0].ncfsPolicy);
        });
    })
});