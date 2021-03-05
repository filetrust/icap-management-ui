import IdentityManagementApi from "./IdentityManagementApi";
import { stub } from "sinon";
import * as axiosHelper from "../../helpers/AxiosHelper";
import NewUser from "../../models/IdentityManagementService/NewUser/NewUser";
import User from "../../models/IdentityManagementService/User/User";
import { UserStatus } from "../../models/enums/UserStatus";

import {
	setUpCancellationToken,
	expectAxiosHelperWasCalled,
	expectAxiosHelperWithArgs
} from "../httpTestHelper";

const axiosHelperStub = stub(axiosHelper, "default").resolves("");

const url = "www.glasswall.com";
const cancellationToken = setUpCancellationToken();

describe("IdentityManagementApi", () => {
	describe("authenticate", () => {
		// Arrange
		const username = "username";
		const notARealPassword = "pass";

		beforeAll(async () => {
			setUpCancellationToken();

			// Act
			await IdentityManagementApi.authenticate(url, username, notARealPassword, cancellationToken);
		});

		afterAll(() => {
			axiosHelperStub.resetHistory();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(axiosHelperStub, 0, url, "POST", cancellationToken, { username, password: notARealPassword });
		});
	});

	describe("newUser", () => {
		// Arrange
		const newUser = new NewUser("firstName", "lastName", "username", "email");

		beforeAll(async () => {
			setUpCancellationToken();

			// Act
			await IdentityManagementApi.newUser(url, newUser, cancellationToken);
		});

		afterAll(() => {
			axiosHelperStub.resetHistory();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(axiosHelperStub, 0, url, "POST", cancellationToken, newUser);
		});
	});

	describe("forgotPassword", () => {
		// Arrange
		const username = "username";

		beforeAll(async () => {
			setUpCancellationToken();

			// Act
			await IdentityManagementApi.forgotPassword(url, username, cancellationToken);
		});

		afterAll(() => {
			axiosHelperStub.resetHistory();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(axiosHelperStub, 0, url, "POST", cancellationToken, { username });
		});
	});

	describe("validateResetToken", () => {
		// Arrange
		const token = "token";

		beforeAll(async () => {
			setUpCancellationToken();

			// Act
			await IdentityManagementApi.validateResetToken(url, token, cancellationToken);
		});

		afterAll(() => {
			axiosHelperStub.resetHistory();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(axiosHelperStub, 0, url, "POST", cancellationToken, { token });
		});
	});

	describe("resetPassword", () => {
		// Arrange
		const token = "token";
		const notARealPassword = "pass";

		beforeAll(async () => {
			setUpCancellationToken();

			// Act
			await IdentityManagementApi.resetPassword(url, token, notARealPassword, cancellationToken);
		});

		afterAll(() => {
			axiosHelperStub.resetHistory();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(axiosHelperStub, 0, url, "POST", cancellationToken, { token, password: notARealPassword });
		});
	});

	describe("getUsers", () => {
		// Arrange
		const authToken = "authToken";

		beforeAll(async () => {
			setUpCancellationToken();

			// Act
			await IdentityManagementApi.getUsers(url, cancellationToken, authToken);
		});

		afterAll(() => {
			axiosHelperStub.resetHistory();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(
				axiosHelperStub, 0, url, "GET", cancellationToken, null, { "Authorization": `Bearer ${authToken}` });
		});
	});

	describe("updateUser", () => {
		// Arrange
		const user = new User(
			"id",
			"firstName",
			"secondName",
			"username",
			"email@email.com",
			UserStatus.Active
		);

		const authToken = "authToken";

		const expectedUrl = `${url}/${user.id}`;

		beforeAll(async () => {
			setUpCancellationToken();

			// Act
			await IdentityManagementApi.updateUser(url, user, cancellationToken, authToken);
		});

		afterAll(() => {
			axiosHelperStub.resetHistory();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(
				axiosHelperStub,
				0,
				expectedUrl,
				"PUT",
				cancellationToken,
				{ ...user },
				{ "Authorization": `Bearer ${authToken}` }
			);
		});
	});

	describe("deleteUser", () => {
		// Arrange
		const userId = "id";
		const expectedUrl = `${url}/${userId}`;
		const authToken = "authToken";

		beforeAll(async () => {
			setUpCancellationToken();

			// Act
			await IdentityManagementApi.deleteUser(url, userId, cancellationToken, authToken);
		});

		afterAll(() => {
			axiosHelperStub.resetHistory();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(
				axiosHelperStub,
				0,
				expectedUrl,
				"DELETE",
				cancellationToken,
				null,
				{ "Authorization": `Bearer ${authToken}` }
			);
		});
	});
});