import { ArgumentNullException } from "../../errors/errors";
import NewUser from "./NewUser";

describe("NewUser", () => {
    let error: any = null;

    const firstName = "firstName";
    const lastName = "lastName";
    const username = "username";
    const email = "email@email.com";

    afterEach(() => {
        error = null;
    });

    it("should_construct_with_valid_arguments", () => {
        // Act
        const newUser = new NewUser(firstName, lastName, username, email);

        // Assert
        expect(newUser.firstName).toEqual(firstName);
    });

    it("throws_an_ArgumentNullException_if_firstName_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("firstName");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new NewUser("", lastName, username, email);
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });

    it("throws_an_ArgumentNullException_if_lastName_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("lastName");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new NewUser(firstName, "", username, email);
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });

    it("throws_an_ArgumentNullException_if_username_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("username");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new NewUser(firstName, lastName, "", email);
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });

    it("throws_an_ArgumentNullException_if_email_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("email");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new NewUser(firstName, lastName, username, "");
        }
        catch(err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });
});