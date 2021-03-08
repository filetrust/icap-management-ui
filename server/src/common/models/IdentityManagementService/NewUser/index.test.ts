import { ArgumentNullException } from "../../errors/errors";
import { NewUserRequest } from "./";
import NewUser from "./NewUser";

describe("NewUserRequest", () => {
    let error: any = null;

    const url = "www.glasswall.com";

    const newUser = new NewUser(
        "firstName",
        "lastName",
        "username",
        "email@email.com"
    );

    afterEach(() => {
        error = null;
    });

    it("should_construct_with_valid_arguments", () => {
        // Act
        const newUserRequest = new NewUserRequest(url, newUser);

        // Assert
        expect(newUserRequest.url).toEqual(url);
        expect(newUserRequest.newUser).toEqual(newUser);
    });

    it("throws_an_ArgumentNullException_if_url_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("url");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new NewUserRequest("", newUser);
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });

    it("throws_an_ArgumentNullException_if_newUser_is_null", () => {
        // Arrange
        const expectedError = new ArgumentNullException("newUser");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new NewUserRequest(url, null);
        }
        catch(err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });
});