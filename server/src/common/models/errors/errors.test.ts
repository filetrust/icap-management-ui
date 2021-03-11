import { ArgumentException } from "./errors";
import { ArgumentNullException } from "./errors";

describe("errors", () => {
    describe("ArgumentException", () => {
        describe("constructor", () => {
            it("sets_property_argument", () => {
                // Act
                const error = new ArgumentException("arg", "some message");

                // Assert
                expect(error.argument).toBe("arg");
            });

            it("sets_property_name", () => {
                // Act
                const error = new ArgumentException("arg", "some message");

                // Assert
                expect(error.name).toBe("ArgumentException");
            });

            it("sets_property_message", () => {
                // Act
                const error = new ArgumentException("arg", "some message");

                // Assert
                expect(error.message).toBe("Argument is invalid: 'arg'. some message");
            });
        });
    });

    describe("ArgumentNullException", () => {
        describe("constructor", () => {
            it("sets_property_argument", () => {
                // Act
                const error = new ArgumentNullException("arg");

                // Assert
                expect(error.argument).toBe("arg");
            });

            it("sets_property_name", () => {
                // Act
                const error = new ArgumentNullException("arg");

                // Assert
                expect(error.name).toBe("ArgumentNullException");
            });

            it("sets_property_message", () => {
                // Act
                const error = new ArgumentNullException("arg");

                // Assert
                expect(error.message).toBe("Argument is invalid: 'arg'. Argument 'arg' must not be null");
            });
        });
    });
});