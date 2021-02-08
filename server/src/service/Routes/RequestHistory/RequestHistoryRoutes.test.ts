import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import { SinonStub, stub } from "sinon";
import request from "supertest";
import { Risk } from "../../../common/models/enums/Risk";
import { FileType } from "../../../common/models/enums/FileType";
import { GetTransactionsResponse } from "../../../common/models/TransactionEventService/GetTransactions";
import { GetTransactionDetailsResponse } from "../../../common/models/TransactionEventService/GetTransactionDetails";
import TestConfig from "../../TestConfig";
import RequestHistoryRoutes from "./RequestHistoryRoutes";

let transactionEventServiceStub: SinonStub;

describe("RequestHistoryRoutes", () => {
    describe("constructor", () => {
        it("should_construct_with_valid_arguments", () => {
            // Arrange
            const config = TestConfig();
            const app = express();
            const logger = winston.createLogger();

            // Act
            const requestHitoryRoutes = new RequestHistoryRoutes(config, app, logger);

            // Assert
            expect(requestHitoryRoutes.logger).toBe(logger);
        });

        it("should_pass_logger_to_TransactionEventService", () => {
            // Arrange
            const config = TestConfig();
            const app = express();
            const logger = winston.createLogger();

            // Act
            const requestHitoryRoutes = new RequestHistoryRoutes(config, app, logger);

            // Assert
            expect(requestHitoryRoutes.transactionEventService.logger).toBe(logger);
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
        const requestHistoryRoutes = new RequestHistoryRoutes(config, app, logger);

        requestHistoryRoutes.setup();

        describe("post_request-history/transactions", () => {
            // Arrange
            const getTransactionsRequestString = {
                Filter: {
                    TimestampRangeStart: new Date(),
                    TimestampRangeEnd: new Date()
                }
            };
            const expectedResponse = new GetTransactionsResponse(
                1,
                [{
                    timestamp: new Date(),
                    fileId: "11111111-1111-1111-1111-11111111111",
                    detectionFileType: FileType.Bmp,
                    risk: Risk.Safe,
                    activePolicyId: "11111111-1111-1111-1111-11111111111",
                    directory: "/some/directory"
                }]
            );

            beforeEach(() => {
                transactionEventServiceStub =
                    stub(requestHistoryRoutes.transactionEventService, "getTransactions")
                        .resolves(expectedResponse);
            });

            afterEach(() => {
                transactionEventServiceStub.restore();
            });
            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .post("/request-history/transactions")
                    .send(getTransactionsRequestString)
                    .expect(200, done)
            });

            it("responds_with_correct_json", (done) => {
                // Act
                request(app)
                    .post("/request-history/transactions")
                    .send(getTransactionsRequestString)
                    .expect(200, (error, result) => {
                        // Assert
                        expect(result.body.count)
                            .toEqual(expectedResponse.count);
                        expect(result.body.files[0].directory)
                            .toEqual(expectedResponse.files[0].directory);
                        done();
                    })
            });
        });

        describe("/post_request-history/transactionDetails", () => {
            // Arrange
            const transactionFilePath = "test";

            const expectedResponse = new GetTransactionDetailsResponse(0, "test");

            beforeEach(() => {
                transactionEventServiceStub =
                    stub(requestHistoryRoutes.transactionEventService, "getTransactionDetails")
                        .resolves(expectedResponse);
            });

            afterEach(() => {
                transactionEventServiceStub.restore();
            });

            it("responds_with_200_OK", (done) => {
                // Act
                // Assert
                request(app)
                    .post("/request-history/transactionDetails/")
                    .send({ transactionFilePath })
                    .expect(200, done)
            });

            it("responds_with_correct_json", (done) => {
                // Act
                // Assert
                request(app)
                    .post("/request-history/transactionDetails/")
                    .send({ transactionFilePath: "path" })
                    .expect(200, (error, result) => {
                        // Assert
                        expect(result.body).toEqual(expectedResponse);
                        done();
                    })
            });
        });
    });
});