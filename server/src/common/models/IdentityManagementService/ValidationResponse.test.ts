import { ArgumentNullException } from "../errors/errors";
import ValidationResponse from "./ValidationResponse";

describe("ValidationResponse", () => {
    let error: any = null;

    const message = "message";

    afterEach(() => {
        error = null;
    });

    it("should_construct_with_valid_arguments", () => {
        // Act
        const validationResponse = new ValidationResponse(message);

        // Assert
        expect(validationResponse.message).toEqual(message);
    });

    it("should_throw_an_ArgumentNullException_if_message_is_empty", () => {
        // Arrange
        const expectedError = new ArgumentNullException("message");

        try {
            // Act
            // tslint:disable-next-line: no-unused-expression
            new ValidationResponse("");
        }
        catch (err) {
            error = err;
        }

        // Assert
        expect(error).toEqual(expectedError);
    });
});