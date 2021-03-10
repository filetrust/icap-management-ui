import { ArgumentNullException } from "../../errors/errors";
import { ValidateResetTokenRequest, ValidateResetTokenResponse } from "./";

describe("ValidateResetTokenRequest", () => {
    let error: any = null;

    const url = "www.glasswall.com";
    const token = "token";

    afterEach(() => {
        error = null;
    });

    it("should_construct_with_valid_arguments", () => {
        // Act
        const validateResetTokenRequest =
            new ValidateResetTokenRequest(url, token);

        // Assert
        expect(validateResetTokenRequest.url).toEqual(url);
        expect(validateResetTokenRequest.token).toEqual(token);
    });

    it("throws_an_ArgumentNullException_if_url_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("url");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new ValidateResetTokenRequest("", token);
        }
        catch(err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });

    it("throws_an_ArgumentNullException_if_token_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("token");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new ValidateResetTokenRequest(url, "");
        }
        catch(err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });
});