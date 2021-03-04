import { stub, SinonStub } from "sinon";
import winston from "winston";
import axios, { CancelToken } from "axios";

import NewUser from "../../../common/models/IdentityManagementService/NewUser/NewUser";
import User from "../../../common/models/IdentityManagementService/User/User";
import { UserStatus } from "../../../common/models/enums/UserStatus";
import { AuthenticateRequest, AuthenticateResponse } from "../../../common/models/IdentityManagementService/Authenticate";
import { NewUserRequest } from "../../../common/models/IdentityManagementService/NewUser";
import { ForgotPasswordRequest } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordRequest";
import { ForgotPasswordResponse } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { ValidateResetTokenRequest, ValidateResetTokenResponse } from "../../../common/models/IdentityManagementService/ValidateResetToken";
import { SaveUserChangesRequest } from "../../../common/models/IdentityManagementService/SaveUserChanges/SaveUserChangesRequest";

import IdentityManagementService from "./IdentityManagementService";
import IdentityManagementApi from "../../../common/http/IdentityManagementApi/IdentityManagementApi";
import { ResetPasswordRequest, ResetPasswordResponse } from "../../../common/models/IdentityManagementService/ResetPassword";


describe("IdentityManagementService", () => {
	let cancellationToken: CancelToken;

	const logger = winston.createLogger({
		transports: [
			new winston.transports.Console({
				format: winston.format.cli()
			})
		]
	});

	let identityManagementService: IdentityManagementService;

	beforeEach(() => {
		identityManagementService = new IdentityManagementService(logger);
	});

	describe("constructor", () => {
		it("should_construct_with_valid_arguments", () => {
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

	describe("forgotPassword", () => {
		let forgotPasswordStub: SinonStub;
		cancellationToken = axios.CancelToken.source().token;

		const responseMessage = "forgot password message";
		const expectedForgotPasswordResponse =
			new ForgotPasswordResponse(responseMessage);

		beforeEach(() => {
			const forgotPasswordResponse = {
				message: responseMessage
			};

			forgotPasswordStub = stub(IdentityManagementApi, "forgotPassword")
				.resolves(forgotPasswordResponse);
		});

		afterEach(() => {
			forgotPasswordStub.restore();
		});

		it("returns_correct_response", async () => {
			// Arrange
			const request = new ForgotPasswordRequest("url", "username");

			// Act
			const result = await identityManagementService.forgotPassword(request, cancellationToken);

			// Assert
			expect(result).toEqual(expectedForgotPasswordResponse);
		})
	});

	describe("validateResetToken", () => {
		let validateResetTokenStub: SinonStub;
		cancellationToken = axios.CancelToken.source().token;

		const responseMessage = "forgot password message";

		const expectedValidateResetTokenResponse =
			new ValidateResetTokenResponse(responseMessage);

		beforeEach(() => {
			const validateResetTokenResponse = {
				message: responseMessage
			};

			validateResetTokenStub = stub(IdentityManagementApi, "validateResetToken")
				.resolves(validateResetTokenResponse);
		});

		afterEach(() => {
			validateResetTokenStub.restore();
		});

		it("returns_correct_response", async () => {
			// Arrange
			const request = new ValidateResetTokenRequest("url", "token");

			// Act
			const result = await identityManagementService.validateResetToken(request, cancellationToken);

			// Assert
			expect(result).toEqual(expectedValidateResetTokenResponse);
		});
	});

	describe("resetPassword", () => {
		let resetPasswordStub: SinonStub;
		cancellationToken = axios.CancelToken.source().token;

		const responseMessage = "reset password message";

		const expectedResetPasswordResponse =
			new ResetPasswordResponse(responseMessage);

		beforeEach(() => {
			const resetPasswordResponse = {
				message: responseMessage
			};

			resetPasswordStub = stub(IdentityManagementApi, "resetPassword")
				.resolves(resetPasswordResponse);
		});

		afterEach(() => {
			resetPasswordStub.restore();
		});

		it("returns_correct_response", async () => {
			// Arrange
			const request = new ResetPasswordRequest("url", "token", "password");

			// Act
			const result = await identityManagementService.resetPassword(request, cancellationToken);

			// Assert
			expect(result).toEqual(expectedResetPasswordResponse);
		});
	});

	describe("getUsers", () => {
		let getUsersStub: SinonStub;

		const users = [
			new User("id", "firstName", "lastName", "username", "email@email.com", UserStatus.Active),
			new User("id2", "firstName", "lastName", "username", "email@email.com", UserStatus.Deactivated)
		];

		beforeEach(() => {
			getUsersStub = stub(IdentityManagementApi, "getUsers").resolves(users);
		});

		afterEach(() => {
			getUsersStub.restore();
		});

		it("returns_correct_response", async () => {
			// Act
			const result = await identityManagementService.getUsers("url", cancellationToken);

			// Assert
			expect(result).toEqual(users);
		});
	});

	describe("saveChanges", () => {
		const updateUserUrl = "www.glasswall.com/update";
		const newUserUrl = "www.glasswall.com/new";
		const deleteUserUrl = "www.glasswall.com/delete";

		const updatedUsers = [
			new User(
				"id",
				"firstName",
				"lastName",
				"username",
				"email@email.com",
				UserStatus.Active,
				true,
				false)
		];

		const newUsers = [
			new NewUser("firstName", "lastName", "username", "email@email.com")
		];

		const deletedUsers = [
			"id1",
			"id2"
		];

		stub(IdentityManagementApi, "updateUser").resolves();
		(IdentityManagementApi as any).newUser.restore();
		stub(IdentityManagementApi, "newUser").resolves();
		stub(IdentityManagementApi, "deleteUser").resolves();

		it("called_IdentityManagementApi", async () => {
			// Arrange
			const updateUserSpy = spyOn(IdentityManagementApi, "updateUser");
			const newUserSpy = spyOn(IdentityManagementApi, "newUser");
			const deleteUserSpy = spyOn(IdentityManagementApi, "deleteUser");

			const request = new SaveUserChangesRequest(
				updateUserUrl, newUserUrl, deleteUserUrl, updatedUsers, newUsers, deletedUsers);

			// Act
			await identityManagementService.saveChanges(request, cancellationToken);

			// Assert
			expect(updateUserSpy).toHaveBeenCalled();
			expect(newUserSpy).toHaveBeenCalled();
			expect(deleteUserSpy).toHaveBeenCalled();
		});
	});
});