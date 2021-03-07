import express from "express";
import bodyParser from "body-parser";
import winston from "winston";
import { SinonStub, stub } from "sinon";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import TestConfig from "../../TestConfig";
import UsersRoutes from "./UsersRoutes";
import User from "../../../common/models/IdentityManagementService/User/User";
import { UserStatus } from "../../../common/models/enums/UserStatus";
import { AuthenticateResponse } from "../../../common/models/IdentityManagementService/Authenticate";
import { ForgotPasswordResponse } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";

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

    describe("routes", () => {
        // Setup
        const config = TestConfig();
        const app = express();
        app.use(bodyParser.json());
        app.use(session({
            genid() {
                return uuidv4() // use UUIDs for session IDs
            },
            secret: uuidv4(),
            cookie: {
                secure: false
            },
            resave: false,
            saveUninitialized: true
        }));
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.cli()
                })
            ]
        });
        const usersRoutes = new UsersRoutes(config, app, logger);

        usersRoutes.setup();

        describe("post_users/login", () => {
            // Arrange
            const loginRequest = {
                username: "fakeUsername",
                password: "notAPassword"
            };

            const authenticatedUser = new User(
                "id",
                "firstName",
                "lastName",
                "fakeUsername",
                "email@email.com",
                UserStatus.Active
            );

            const authToken = "authToken";

            const authenticateResponse = new AuthenticateResponse(
                authenticatedUser, authToken);


            beforeEach(() => {
                identityManagementServiceStub =
                    stub(usersRoutes.identityManagementService, "authenticate")
                        .resolves(authenticateResponse);
            });

            afterEach(() => {
                identityManagementServiceStub.restore();
            });

            it("responds_with_correct_json", (done) => {
                // Act
                request(app)
                    .post("/users/login")
                    .send(loginRequest)
                    .expect(200, (error, result) => {
                        // Assert
                        expect(result.body.id).toEqual(authenticatedUser.id);
                        expect(result.body.firstName).toEqual(authenticatedUser.firstName);
                        expect(result.body.lastName).toEqual(authenticatedUser.lastName);
                        expect(result.body.username).toEqual(authenticatedUser.username);
                        expect(result.body.email).toEqual(authenticatedUser.email);
                        expect(result.body.status).toEqual(authenticatedUser.status);
                        done();
                    });
            });
        });

        describe("post_users/forgot-password", () => {
            // Arrange
            const forgotPasswordRequest = {
                username: "username",
            };

            const forgotPasswordMessage = "forgot password message";
            const forgotPasswordResponse = new ForgotPasswordResponse(forgotPasswordMessage);

            beforeEach(() => {
                identityManagementServiceStub =
                    stub(usersRoutes.identityManagementService, "forgotPassword")
                        .resolves(forgotPasswordResponse);
            });

            afterEach(() => {
                identityManagementServiceStub.restore();
            });

            it("responds_with_correct_json", (done) => {
                // Act
                request(app)
                    .post("/users/forgot-password")
                    .send(forgotPasswordRequest)
                    .expect(200, (error, result) => {
                        // Assert
                        expect(result.body.message).toEqual(forgotPasswordMessage);
                        done();
                    });
            });
        });
    });
});