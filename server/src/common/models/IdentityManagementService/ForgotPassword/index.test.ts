import { ArgumentNullException } from "../../errors/errors";
import { ForgotPasswordRequest } from "./";

describe("ForgotPasswordRequest", () => {
    let error: any = null;
    const url = "www.glasswall.com";
    const username = "username";

    afterEach(() => {
        error = null;
    });

    it("should_construct_with_valid_arguments", () => {
        // Act
        const forgotPasswordRequest = new ForgotPasswordRequest(url, username);

        // Assert
        expect(forgotPasswordRequest.url).toEqual(url);
        expect(forgotPasswordRequest.username).toEqual(username);
    });

    it("throws_ArgumentNullException_if_url_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("url");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new ForgotPasswordRequest("", username);
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });

    it("throws_ArgumentNullException_if_username_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("username");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new ForgotPasswordRequest(url, "");
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });
});