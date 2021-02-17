import { GetPolicyByIdRequest } from "./GetPolicyByIdRequest";

describe("GetPolicyByIdRequest", () => {
    describe("constructor", () => {
        it("should_construct_with_valid_arguments", () => {
            // Arrange
            const url = "www.glasswall.com";
            const policyId = "id";

            // Act
            const getPolicyByIdRequest = new GetPolicyByIdRequest(
                url,
                policyId
            );

            // Assert
            expect(getPolicyByIdRequest.policyId)
                .toEqual(policyId);
        });

        it("throws_ArgumentNullException_if_url_is_empty", () => {
            // Arrange
            const url = "";
            const policyId = "id";

            try {
                // Act
                // tslint:disable-next-line: no-unused-expression
                new GetPolicyByIdRequest(
                    url,
                    policyId
                );
            }
            catch (error) {
                // Assert
                expect(error.message)
                    .toEqual("Argument is invalid: 'url'. Argument 'url' must not be null");
            }
        });

        it("throws_ArgumentNullException_if_policyId_is_empty", () => {
            // Arrange
            const url = "www.glasswall.com";
            const policyId: string = "";

            try {
                // Act
                // tslint:disable-next-line: no-unused-expression
                new GetPolicyByIdRequest(
                    url,
                    policyId
                );
            }
            catch (error) {
                // Assert
                expect(error.message)
                    .toEqual("Argument is invalid: 'policyId'. Argument 'policyId' must not be null");
            }
        });
    });
});