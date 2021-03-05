import { Token } from "./ValidateToken";
import { SinonStub, stub } from "sinon";
import * as axiosHelper from "../../../helpers/AxiosHelper";
import TestConfig from "../../../../service/TestConfig";
import {
	expectAxiosHelperWasCalled,
	expectAxiosHelperWithArgs
} from "../../httpTestHelper";

const config = TestConfig();
let axiosHelperStub: SinonStub;
const expectedUrl =
	config.identityManagement.identityManagementServiceBaseUrl +
	config.identityManagement.validateTokenPath;

describe("ValidateToken", () => {
	describe("called_axios_helper_correctly", () => {
		// Arrange
		const token = "token";

		beforeAll(async () => {
			axiosHelperStub = stub(axiosHelper, "default").resolves("");
			// Act
			await Token.validateToken(config, token);
		});

		afterAll(() => {
			axiosHelperStub.resetHistory();
			axiosHelperStub.restore();
		});

		// Assert
		it("called_axios_helper", () => {
			expectAxiosHelperWasCalled(axiosHelperStub, 1);
		});

		it("called_axios_helper_with_correct_args", () => {
			expectAxiosHelperWithArgs(axiosHelperStub, 0, expectedUrl, "POST", null, { token });
		});
	});

	describe("returns_correct_response", () => {
		afterEach(() => {
			axiosHelperStub.restore();
		});

		it("returns_true_if_token_is_valid", async () => {
			// Arrange
			axiosHelperStub = stub(axiosHelper, "default").resolves({ message: "Token is valid" });

			// Act
			const validateTokenResponse = await Token.validateToken(config, "token");

			// Assert
			expect(validateTokenResponse).toBe(true);
		});

		it("returns_false_if_token_is_invalid", async () => {
			// Arrange
			axiosHelperStub = stub(axiosHelper, "default").resolves({ message: "Token is invalid" });

			// Act
			const validateTokenResponse = await Token.validateToken(config, "token");

			// Assert
			expect(validateTokenResponse).toBe(false);
		});
	});
});

