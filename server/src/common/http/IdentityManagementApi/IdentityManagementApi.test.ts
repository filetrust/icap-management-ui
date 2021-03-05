import IdentityManagementApi from "./IdentityManagementApi";
import { stub, SinonStub } from "sinon";
import axios, { CancelToken } from "axios";
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
			const authenticateHelperArgs = axiosHelperStub.getCall(0).args;
			expect(authenticateHelperArgs[0]).toEqual(url);
			expect(authenticateHelperArgs[1]).toEqual("POST");
			expect(authenticateHelperArgs[2]).toEqual(cancellationToken);
			expect(authenticateHelperArgs[3]).toEqual({ username, password });
		});
	});


});