import { ArgumentException } from "./errors";
import { ArgumentNullException } from "./errors";

describe("errors", () => {
    describe("ArgumentException", () => {
        describe("constructor", () => {
            it("sets_property_argument", () => {
                // Arrange
                const error = new ArgumentException("arg", "some message");

                // Act
                // Assert
                expect(error.argument).toBe("arg");
            });

            it("sets_property_name", () => {
                // Arrange
                const error = new ArgumentException("arg", "some message");

                // Act
                // Assert
                expect(error.name).toBe("ArgumentException");
            });

            it("sets_property_message", () => {
                // Arrange
                const error = new ArgumentException("arg", "some message");

                // Act
                // Assert
                expect(error.message).toBe("Argument is invalid: 'arg'. some message");
            });
        });
    });

    describe("ArgumentNullException", () => {
        describe("constructor", () => {
            it("sets_property_argument", () => {
                // Arrange
                const error = new ArgumentNullException("arg");

                // Act
                // Assert
                expect(error.argument).toBe("arg");
            });

            it("sets_property_name", () => {
                // Arrange
                const error = new ArgumentNullException("arg");

                // Act
                // Assert
                expect(error.name).toBe("ArgumentNullException");
            });

            it("sets_property_message", () => {
                // Arrange
                const error = new ArgumentNullException("arg");

                // Act
                // Assert
                expect(error.message).toBe("Argument is invalid: 'arg'. Argument 'arg' must not be null");
            });
        });
    });
});