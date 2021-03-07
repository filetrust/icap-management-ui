import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import { SinonStub, stub } from "sinon";
import request from "supertest";
import TestConfig from "../../TestConfig";
import UsersRoutes from "./UsersRoutes";

let identityManagementServiceStub: SinonStub;

describe("UsersRoutes", () => {
    describe("constructor", () => {
        it("should_construct_with_valid_arguments", () => {
            // Arrange
            const config = TestConfig();
            const app = express();
            const logger = winston.createLogger();

            // Act
            const usersRoutes = new UsersRoutes(config, app, logger);

            // Assert
            expect(usersRoutes.app).toBe(app);
            expect(usersRoutes.logger).toBe(logger);
        });

        it("should_pass_logger_to_TransactionEventService", () => {
            // Arrange
            const config = TestConfig();
            const app = express();
            const logger = winston.createLogger();

            // Act
            const requestHitoryRoutes = new UsersRoutes(config, app, logger);

            // Assert
            expect(requestHitoryRoutes.identityManagementService.logger).toBe(logger);
        });
    });
});