import { ArgumentNullException } from "../../errors/ArgumentNullException";
import * as validatePassword from "../ValidatePassword";
import { ResetPasswordRequest } from "./";

describe("ResetPasswordRequest", () => {
    let error: any = null;

    const url = "www.glasswall.com";
    const token = "token";
    const notARealPassword = "fakepass";

    afterEach(() => {
        error = null;
    });

    it("should_construct_with_valid_arguments", () => {
        // Act
        const resetPasswordRequest = new ResetPasswordRequest(url, token, notARealPassword);

        // Assert
        expect(resetPasswordRequest.url).toEqual(url);
        expect(resetPasswordRequest.token).toEqual(token);
        expect(resetPasswordRequest.password).toEqual(notARealPassword);
    });

    it("throws_an_ArgumentNullException_if_url_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("url");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new ResetPasswordRequest("", token, notARealPassword);
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
            new ResetPasswordRequest(url, "", notARealPassword);
        }
        catch(err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });

    it("called_validatePassword", () => {
        // Arrange
        const spy = spyOn(validatePassword, "default");

        // Act
        // tslint:disable-next-line: no-unused-expression
        new ResetPasswordRequest(url, token, notARealPassword);

        // Assert
        expect(spy).toHaveBeenCalled();
    });
});