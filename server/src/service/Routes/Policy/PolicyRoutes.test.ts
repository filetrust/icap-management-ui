import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import { SinonStub, stub } from "sinon";
import request from "supertest";

import TestConfig from "../../TestConfig";
import PolicyRoutes from "./PolicyRoutes";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { Guid } from "guid-typescript";

import policyExample from "../../../common/http/PolicyManagementApi/policyExample.json";

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

        describe("policy/getPolicy", () => {
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

        describe("policy/current", () => {
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
    });
});