import { ArgumentException, ArgumentNullException } from "../errors/errors";
import validatePassword from "./ValidatePassword";
import MINIMUM_PASSWORD_LENGTH from "./MinimumPasswordLength";

describe("ValidatePassword", () => {
    let error: any = null;

    const notARealPassword = "fakepass123456789";

    afterEach(() => {
        error = null;
    });

    it("should_pass_with_a_valid_password", () => {
        try {
            // Act
            validatePassword(notARealPassword);
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(null);
    });

    it("should_throw_ArgumentNullException_if_password_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("password");

        try {
            // Act
            validatePassword("");
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });

    it("should_throw_ArgumentException_if_password_is_invalid", () => {
        try {
            // Act
            validatePassword("1".repeat(MINIMUM_PASSWORD_LENGTH-1));
        }
        catch(err){
            error = err;
        }

        expect(error instanceof ArgumentException).toBe(true);
    });
});