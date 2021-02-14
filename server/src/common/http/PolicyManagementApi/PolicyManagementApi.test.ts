import PolicyManagementApi from "./PolicyManagementApi";
import { stub, SinonStub } from "sinon";
import axios, { CancelToken } from "axios";
import { Guid } from "guid-typescript";
import { Policy } from "../../../common/models/PolicyManagementService/Policy/Policy";
import { PolicyHistory } from "../../../common/models/PolicyManagementService/PolicyHistory/PolicyHistory";

import policyExample from "./policyExample.json";

let axiosStub: SinonStub;
let axiosStubResult: any;

const url = "www.glasswall.com";
let cancellationToken: CancelToken;

const setUpCancellationToken = () => {
    const cancellationTokenSource = axios.CancelToken.source();
    cancellationToken = cancellationTokenSource.token;
};

const setAxiosStubResultWithError = () => {
    axiosStubResult = {
        status: 500,
        statusText: "Error"
    };
};

const expectAxios = (stubbedAxios: SinonStub, expectedUrl: string) => {
    expect(stubbedAxios.getCalls()).toHaveLength(1);
    expect(stubbedAxios.getCall(0).args).toHaveLength(2);
    expect(stubbedAxios.getCall(0).args[0]).toEqual(expectedUrl);
};

const expectAxiosPut = (stubbedAxios: SinonStub, expectedUrl: string, data?: any) => {
    expect(stubbedAxios.getCalls()).toHaveLength(1);
    expect(stubbedAxios.getCall(0).args[0]).toEqual(expectedUrl);

    if (data) {
        expect(stubbedAxios.getCall(0).args).toHaveLength(3);
        expect(stubbedAxios.getCall(0).args[1]).toEqual(data);
    }

    if (!data) {
        expect(stubbedAxios.getCall(0).args).toHaveLength(2);
    }
};

describe("PolicyManagementApi", () => {
    describe("getPolicyById", () => {
        describe("response_status_not_ok", () => {
            // Arrange
            const policyId = "id";
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                setUpCancellationToken();
                setAxiosStubResultWithError();

                axiosStub = stub(axios, "get").returns(axiosStubResult);

                // Act
                try {
                    await PolicyManagementApi.getPolicyById(url, policyId, cancellationToken);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("response_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual(expectedError);
            });
        });

        describe("should_respond_with_response_json_if_OK", () => {
            // Arrange
            const policyId = "id";
            const expectedRequestUrl = `${url}?id=${policyId.toString()}`;
            const expectedResponse = { test: "test" };
            let result: string;

            beforeEach(async () => {
                const cancellationTokenSource = axios.CancelToken.source();
                cancellationToken = cancellationTokenSource.token;

                axiosStubResult = {
                    statusText: "OK",
                    data: { test: "test" }
                };

                axiosStub = stub(axios, "get").returns(axiosStubResult);

                // Act
                result = await PolicyManagementApi.getPolicyById(url, policyId, cancellationToken);
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_expected_response", () => {
                expect(result).not.toBe(undefined);
                expect(result).toEqual(expectedResponse);
            });

            it("called_axios_using_GET", () => {
                expectAxios(axiosStub, expectedRequestUrl);
            });
        });
    });

    describe("getPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                setUpCancellationToken();
                setAxiosStubResultWithError();

                axiosStub = stub(axios, "get").returns(axiosStubResult);

                // Act
                try {
                    await PolicyManagementApi.getPolicy(url, cancellationToken);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual(expectedError);
            });
        });

        describe("should_respond_with_response_json_if_OK", () => {
            // Arrange
            const expectedResponse = { testResult: "test" };
            let result: Policy;

            beforeEach(async () => {
                const cancellationTokenSource = axios.CancelToken.source();
                cancellationToken = cancellationTokenSource.token;

                axiosStubResult = {
                    statusText: "OK",
                    data: { testResult: "test" }
                };

                axiosStub = stub(axios, "get").returns(axiosStubResult);

                // Act
                result = await PolicyManagementApi.getPolicy(url, cancellationToken);
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_expected_response", () => {
                expect(result).not.toBe(undefined);
                expect(result).toEqual(expectedResponse);
            });

            it("called_axios_using_GET", () => {
                expectAxios(axiosStub, url);
            });
        });
    });

    describe("saveDraftPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            let error: any;
            const expectedError = new Error("Error");

            const draftPolicy = new Policy(
                policyExample.id,
                policyExample.policyType,
                policyExample.published,
                policyExample.lastEdited,
                policyExample.created,
                policyExample.ncfsPolicy,
                policyExample.adaptionPolicy,
                policyExample.updatedBy
            );

            beforeEach(async () => {
                setUpCancellationToken();
                setAxiosStubResultWithError();

                axiosStub = stub(axios, "put").returns(axiosStubResult);

                // Act
                try {
                    await PolicyManagementApi.saveDraftPolicy(url, draftPolicy, cancellationToken);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual(expectedError);
            });

            it("called_fetch_using_PUT", () => {
                expectAxiosPut(axiosStub, url, JSON.stringify(draftPolicy));
            });
        });
    });

    describe("publishPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const policyId = Guid.create();
            const expectedRequestUrl = `${url}?id=${policyId.toString()}`;
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                setAxiosStubResultWithError();

                axiosStub = stub(axios, "put").returns(axiosStubResult);

                // Act
                try {
                    await PolicyManagementApi.publishPolicy(url, policyId);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual(expectedError);
            });

            it("called_axios_using_PUT", () => {
                expectAxiosPut(axiosStub, expectedRequestUrl);
            });
        });
    });

    describe("distributeAdaptationPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                setAxiosStubResultWithError();

                axiosStub = stub(axios, "put").returns(axiosStubResult);

                // Act
                try {
                    await PolicyManagementApi.distributeAdaptationPolicy(url);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual(expectedError);
            });

            it("called_axios_using_PUT", () => {
                expectAxiosPut(axiosStub, url);
            });
        });
    });

    describe("distributeNcfsPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                setAxiosStubResultWithError();

                axiosStub = stub(axios, "put").returns(axiosStubResult);

                // Act
                try {
                    await PolicyManagementApi.distributeNcfsPolicy(url);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual(expectedError);
            });

            it("called_axios_using_PUT", () => {
                expectAxiosPut(axiosStub, url);
            });
        });
    });

    describe("deleteDraftPolicy", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            const policyId = Guid.create();
            const expectedRequestUrl = `${url}?id=${policyId.toString()}`;
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                setUpCancellationToken();
                setAxiosStubResultWithError();

                axiosStub = stub(axios, "delete").returns(axiosStubResult);

                // Act
                try {
                    await PolicyManagementApi.deleteDraftPolicy(url, policyId, cancellationToken);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual(expectedError);
            });

            it("called_axios_using_DELETE", () => {
                expectAxios(axiosStub, expectedRequestUrl);
            });
        });
    });

    describe("_getPolicyHistory", () => {
        describe("response_status_not_OK", () => {
            // Arrange
            let error: any;
            const expectedError = new Error("Error");

            beforeEach(async () => {
                setUpCancellationToken();
                setAxiosStubResultWithError();

                axiosStub = stub(axios, "get").returns(axiosStubResult);

                // Act
                try {
                    await PolicyManagementApi.getPolicyHistory(url, cancellationToken);
                }
                catch (err) {
                    error = err;
                }
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_status_text", () => {
                expect(error).not.toBe(undefined);
                expect(error).toEqual(expectedError);
            });
        });

        describe("should_respond_with_response_json_if_OK", () => {
            // Arrange
            const expectedResponse = ["test"];
            let result: PolicyHistory;

            beforeEach(async () => {
                const cancellationTokenSource = axios.CancelToken.source();
                cancellationToken = cancellationTokenSource.token;

                axiosStubResult = {
                    statusText: "OK",
                    data: ["test"]
                };

                axiosStub = stub(axios, "get").returns(axiosStubResult);

                // Act
                result = await PolicyManagementApi.getPolicyHistory(url, cancellationToken);
            });

            afterEach(() => {
                axiosStub.restore();
            });

            // Assert
            it("responds_with_expected_response", () => {
                expect(result).not.toBe(undefined);
                expect(result).toEqual(expectedResponse);
            });

            it("called_axios_using_GET", () => {
                expectAxios(axiosStub, url);
            });
        });
    });
});