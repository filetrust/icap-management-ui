import { stub, SinonStub } from "sinon";
import winston from "winston";
import axios, { CancelToken } from "axios";

import NewUser from "../../../common/models/IdentityManagementService/NewUser/NewUser";
import User from "../../../common/models/IdentityManagementService/User/User";
import { AuthenticateRequest, AuthenticateResponse } from "../../../common/models/IdentityManagementService/Authenticate";
import { NewUserRequest } from "../../../common/models/IdentityManagementService/NewUser";

import IdentityManagementService from "./IdentityManagementService";
import IdentityManagementApi from "../../../common/http/IdentityManagementApi/IdentityManagementApi";

let cancellationToken: CancelToken;

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.cli()
		})
	]
});

describe("IdentityManagementService", () => {
	describe("constructor", () => {
		it("should_construct_with_valid_arguments", () => {
			// Act
			const identityManagementService = new IdentityManagementService(logger);

			// Assert
			expect(identityManagementService.logger).toEqual(logger);
		});
	});

	describe("authenticate", () => {
		let authenticateStub: SinonStub;
		cancellationToken = axios.CancelToken.source().token;

		const authenticatedUser = new User(
			"id",
			"firstName",
			"lastName",
			"username",
			"username"
		);
		const expectedAuthenticateResponse = new
			AuthenticateResponse(authenticatedUser, "token");

		beforeEach(() => {
			const authenticateApiResponse = {
				id: "id",
				username: "username",
				firstName: "firstName",
				lastName: "lastName",
				token: "token"
			}

			authenticateStub = stub(IdentityManagementApi, "authenticate")
				.resolves(authenticateApiResponse);
		});

		afterEach(() => {
			authenticateStub.restore();
		});

		it("returns_correct_response", async () => {
			// Arrange
			const identityManagementService = new IdentityManagementService(logger);
			const request = new AuthenticateRequest("url", "username", "password");

			// Act
			const result = await identityManagementService.authenticate(request, cancellationToken);

			// Assert
			expect(result).toEqual(expectedAuthenticateResponse);
		});
	});

	describe("newUser", () => {
		cancellationToken = axios.CancelToken.source().token;

		stub(IdentityManagementApi, "newUser").resolves();

		it("called_IdentityManagementApi_newUser", async () => {
			// Arrange
			const spy = spyOn(IdentityManagementApi, "newUser");
			const identityManagementService = new IdentityManagementService(logger);

			const url = "url";
			const newUser = new NewUser("firstName", "lastName", "username", "email@email.com");
			const request = new NewUserRequest(url, newUser);

			// Act
			await identityManagementService.newUser(request, cancellationToken);

			// Assert
			expect(spy).toHaveBeenCalled();
			expect(spy).toHaveBeenCalledWith(url, newUser, cancellationToken);
		});
	});
});