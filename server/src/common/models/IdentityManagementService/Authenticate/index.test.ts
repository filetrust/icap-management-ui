import { ArgumentException, ArgumentNullException } from "../../errors/errors";
import { AuthenticateRequest, AuthenticateResponse } from "./";
import MINIMUM_PASSWORD_LENGTH from "../MinimumPasswordLength";
import User from "../User/User";
import { UserStatus } from "../../enums/UserStatus";

describe("AuthenticateRequest", () => {
    let error: any = null;
    const url = "www.glasswall.com";
    const username = "username";
    const notARealPassword = "fakepass";

    afterEach(() => {
        error = null;
    });

    it("should_construct_with_valid_arguments", () => {
        // Act
        const authenticateRequest = new AuthenticateRequest(
            url, username, notARealPassword);

        // Assert
        expect(authenticateRequest.url).toEqual(url);
        expect(authenticateRequest.username).toEqual(username);
        expect(authenticateRequest.password).toEqual(notARealPassword);
    });

    it("throws_ArgumentNullException_if_url_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("url");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new AuthenticateRequest("", username, notARealPassword);
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
            new AuthenticateRequest(url, "", notARealPassword);
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });

    it("called_validatePassword", () => {});
});

describe("AuthenticateResponse", () => {
    let error: any = null;

    const user = new User(
        "id",
        "firstName",
        "lastName",
        "username",
        "email@email.com",
        UserStatus.Active
    );

    const token = "token";

    afterEach(() => {
        error = null;
    });

    it("should_construct_with_valid_arguments", () => {
        // Act
        const authenticateResponse = new AuthenticateResponse(user, token);

        // Assert
        expect(authenticateResponse.user).toEqual(user);
        expect(authenticateResponse.token).toEqual(token);
    });

    it("throws_ArgumentNullException_if_user_is_null", () => {
        // Arrange
        const expectedError = new ArgumentNullException("user");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new AuthenticateResponse(null, token);
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError)
    });

    it("throws_ArgumentNullException_if_token_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("token");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new AuthenticateResponse(user, "");
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });
});