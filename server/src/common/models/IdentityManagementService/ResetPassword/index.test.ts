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

    it("throws_an_ArgumentNullException_if_url_is_empty", () => {});

    it("throws_an_ArgumentNullException_if_token_is_empty", () => {});

    it("called_validatePassword", () => {});
});