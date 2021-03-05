import IdentityManagementApi from "./IdentityManagementApi";
import { stub, SinonStub } from "sinon";
import axios, { CancelToken, Method } from "axios";
import * as axiosHelper from "../../helpers/AxiosHelper";
import NewUser from "../../models/IdentityManagementService/NewUser/NewUser";

const axiosHelperStub = stub(axiosHelper, "default").resolves("");

const url = "www.glasswall.com";
let cancellationToken: CancelToken;

const setUpCancellationToken = () => {
	const cancellationTokenSource = axios.CancelToken.source();
	cancellationToken = cancellationTokenSource.token;
};

const expectAxiosHelperWasCalled = (stubbed: SinonStub, callCount: number) => expect(stubbed.getCalls()).toHaveLength(callCount);

const expectAxiosHelperWithArgs = (
	stubbed: SinonStub,
	expectedCall: number,
	expectedUrl: string,
	expectedMethod: Method,
	expectedCancellationToken: CancelToken,
	expectedData: any) => {

	const helperArgs = stubbed.getCall(expectedCall).args;
	expect(helperArgs[0]).toEqual(expectedUrl);
	expect(helperArgs[1]).toEqual(expectedMethod);
	expect(helperArgs[2]).toEqual(expectedCancellationToken);
	expect(helperArgs[3]).toEqual(expectedData);
};

describe("IdentityManagementApi", () => {
	describe("authenticate", () => {
		// Arrange
		const username = "username";
		const password = "password";

		beforeAll(async () => {
			setUpCancellationToken();

			// Act
			await IdentityManagementApi.authenticate(url, username, password, cancellationToken);
		});

		afterAll(() => {
			axiosHelperStub.restore();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(axiosHelperStub, 0, url, "POST", cancellationToken, {username, password});
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
			axiosHelperStub.restore();
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
			axiosHelperStub.restore();
		});

		// Assert
		it("called_axios_helper", async () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(axiosHelperStub, 0, url, "POST", cancellationToken, {username});
		});
	});
});