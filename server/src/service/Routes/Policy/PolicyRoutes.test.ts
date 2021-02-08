import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import axios from "axios";
import request from "supertest";
import { SinonStub, stub } from "sinon";
import { Guid } from "guid-typescript";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { PolicyHistory } from "../../../common/models/PolicyManagementService/PolicyHistory/PolicyHistory";

import TestConfig from "../../TestConfig";
import PolicyRoutes from "./PolicyRoutes";

import policyExample from "../../../common/http/PolicyManagementApi/policyExample.json";
import PaginationModel from "../../../common/models/PolicyManagementService/PolicyHistory/GetPaginatedPolicyHistoryRequest/PaginationModel/PaginationModel";

let policyManagementServiceStub: SinonStub;

describe("PolicyRoutes", () => {
    describe("constructor", () => {
        it("should_construct_with_valid_arguments", () => {
            // Arrange
            const config = TestConfig();
            const app = express();
            const logger = winston.createLogger();

            // Act
            const policyRoutes = new PolicyRoutes(config, app, logger);

            // Assert
            expect(policyRoutes.logger).toBe(logger);
        });

        it("should_pass_logger_to_PolicyManagementService", () => {
            // Arrange
            const config = TestConfig();
            const app = express();
            const logger = winston.createLogger();

            // Act
            const policyRoutes = new PolicyRoutes(config, app, logger);

            // Assert
            expect(policyRoutes.policyManagementService.logger).toBe(logger);
        });
    });

    describe("routes", () => {
        // Setup
        const config = TestConfig();
        const app = express();
        app.use(bodyParser.json())
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.cli()
                })
            ]
        });
        const policyRoutes = new PolicyRoutes(config, app, logger);

        policyRoutes.setup();

        describe("get_/policy/getPolicy", () => {
            // Arrange
            const policyId = Guid.create().toString();

            const expectedResponse = new Policy(
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
                policyManagementServiceStub =
                    stub(policyRoutes.policyManagementService, "getPolicy")
                        .resolves(expectedResponse);
            });

            afterEach(() => {
                policyManagementServiceStub.restore();
            });

            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .get("/policy/getPolicy/" + policyId)
                    .expect(200, done)
            });

            it("responds_with_correct_json", (done) => {
                // Act
                request(app)
                    .get("/policy/getPolicy/" + policyId)
                    .expect(200, (error, result) => {
                        // Assert
                        expect(result.text).toEqual(JSON.stringify(expectedResponse));
                        done();
                    })
            });
        });

        describe("get_policy/current", () => {
            // Arrange
            const expectedResponse = new Policy(
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
                policyManagementServiceStub =
                    stub(policyRoutes.policyManagementService, "getCurrentPolicy")
                        .resolves(expectedResponse);
            });

            afterEach(() => {
                policyManagementServiceStub.restore();
            });

            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .get("/policy/current")
                    .expect(200, done)
            });

            it("responds_with_correct_json", (done) => {
                // Act
                request(app)
                    .get("/policy/current")
                    .expect(200, (error, result) => {
                        // Assert
                        expect(result.text).toEqual(JSON.stringify(expectedResponse));
                        done();
                    })
            });
        });

        describe("get_/policy/draft", () => {
            // Arrange
            const expectedResponse = new Policy(
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
                policyManagementServiceStub =
                    stub(policyRoutes.policyManagementService, "getDraftPolicy")
                        .resolves(expectedResponse);
            });

            afterEach(() => {
                policyManagementServiceStub.restore();
            });

            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .get("/policy/draft")
                    .expect(200, done)
            });

            it("responds_with_correct_json", (done) => {
                // Act
                request(app)
                    .get("/policy/draft")
                    .expect(200, (error, result) => {
                        // Assert
                        expect(result.text).toEqual(JSON.stringify(expectedResponse));
                        done();
                    })
            });
        });

        describe("put_/policy/draft", () => {
            // Arrange
            const expectedRequestUrl =
                config.policy.policyManagementServiceBaseUrl +
                config.policy.saveDraftPolicyPath;

            beforeEach(() => {
                policyManagementServiceStub = stub(
                    policyRoutes.policyManagementService, "saveDraftPolicy")
                    .resolves();
            });

            afterEach(() => {
                policyManagementServiceStub.restore();
            });

            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .put("/policy/draft")
                    .send(policyExample)
                    .expect(200, done)
            });

            it("called_PolicyManagementService_saveDraftPolicy", (done) => {
                // Arrange
                const spy = spyOn(policyRoutes.policyManagementService, "saveDraftPolicy");

                // Act
                request(app)
                    .put("/policy/draft")
                    .send(policyExample)
                    .expect(200, () => {
                        // Assert
                        expect(spy).toHaveBeenCalled();
                        expect(spy).toBeCalledWith(expectedRequestUrl, policyExample, axios.CancelToken.source().token);
                        done();
                    })
            });
        });

        describe("put_/policy/publish", () => {
            // Arrange
            const expectedPublishUrl =
                config.policy.policyManagementServiceBaseUrl +
                config.policy.publishPolicyPath;

            const expectedDistributeAdaptationUrl =
                config.policy.policyManagementServiceBaseUrl +
                config.policy.distributeAdaptionPolicyPath;

            const expectedDistributeNcfsUrl =
                config.policy.policyManagementServiceBaseUrl +
                config.policy.distributeNcfsPolicyPath

            const policyId = Guid.create();

            beforeEach(() => {
                policyManagementServiceStub = stub(
                    policyRoutes.policyManagementService, "publishPolicy")
                    .resolves();
            });

            afterEach(() => {
                policyManagementServiceStub.restore();
            });

            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .put("/policy/publish/" + policyId)
                    .expect(200, done)
            });

            it("called_PolicyManagementService_publishPolicy", (done) => {
                // Arrange
                const spy = spyOn(policyRoutes.policyManagementService, "publishPolicy");

                // Act
                request(app)
                    .put("/policy/publish/" + policyId)
                    .expect(200, () => {
                        // Assert
                        expect(spy).toHaveBeenCalled()
                        expect(spy).toBeCalledWith(
                            expectedPublishUrl, expectedDistributeAdaptationUrl, expectedDistributeNcfsUrl, policyId);
                        done();
                    })
            })
        });

        describe("delete_/policy/draft", () => {
            // Arrange
            const expectedRequestUrl =
                config.policy.policyManagementServiceBaseUrl +
                config.policy.deletePolicyPath;

            const policyId = Guid.create();

            beforeEach(() => {
                policyManagementServiceStub = stub(
                    policyRoutes.policyManagementService, "deleteDraftPolicy")
                    .resolves();
            });

            afterEach(() => {
                policyManagementServiceStub.restore();
            });

            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .delete("/policy/draft/" + policyId)
                    .expect(200, done)
            });

            it("called_PolicyManagementService_deleteDraftPolicy", (done) => {
                // Arrange
                const spy = spyOn(policyRoutes.policyManagementService, "deleteDraftPolicy");

                // Act
                request(app)
                    .delete("/policy/draft/" + policyId)
                    .expect(200, () => {
                        // Assert
                        expect(spy).toHaveBeenCalled();
                        expect(spy).toBeCalledWith(expectedRequestUrl, policyId, axios.CancelToken.source().token);
                        done();
                    })
            });
        });

        describe("get_/policy/history", () => {
            // Arrange
            const expectedResponse = new PolicyHistory(
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
                policyManagementServiceStub = stub(
                    policyRoutes.policyManagementService, "getPolicyHistory")
                    .resolves(expectedResponse);
            });

            afterEach(() => {
                policyManagementServiceStub.restore();
            });

            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .get("/policy/history")
                    .expect(200, done)
            });

            it("responds_with_correct_json", (done) => {
                // Act
                request(app)
                    .get("/policy/history")
                    .expect(200, (error, result) => {
                        // Assert
                        expect(result.text).toEqual(JSON.stringify(expectedResponse));
                        done();
                    })
            });
        });

        describe("post_/policy/history", () => {
            // Arrange
            const expectedResponse = new PolicyHistory(
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
                policyManagementServiceStub = stub(
                    policyRoutes.policyManagementService, "getPaginatedPolicyHistory")
                    .resolves(expectedResponse);
            });

            afterEach(() => {
                policyManagementServiceStub.restore();
            });

            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .post("/policy/history")
                    .send({pagination})
                    .expect(200, done)
            });

            it("responds_with_correct_json", (done) => {
                // Act
                request(app)
                    .post("/policy/history")
                    .send({pagination})
                    .expect(200, (error, result) => {
                        // Assert
                        expect(result.text).toEqual(JSON.stringify(expectedResponse));
                        done();
                    })
            });

        });
    });
});