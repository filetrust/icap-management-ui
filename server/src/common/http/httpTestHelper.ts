import axios, { CancelToken, Method } from "axios";
import { SinonStub } from "sinon";

export const setUpCancellationToken = () => {
	const cancellationTokenSource = axios.CancelToken.source();
	return cancellationTokenSource.token;
};

export const expectAxiosHelperWasCalled = (stubbed: SinonStub, callCount: number) => {
	expect(stubbed.getCalls()).toHaveLength(callCount);
};

export const expectAxiosHelperWithArgs = (
	stubbed: SinonStub,
	expectedCall: number,
	expectedUrl: string,
	expectedMethod: Method,
	expectedCancellationToken: CancelToken,
	expectedData?: any,
	expectedHeaders?: { [header: string]: string }) => {

	const helperArgs = stubbed.getCall(expectedCall).args;
	expect(helperArgs[0]).toEqual(expectedUrl);
	expect(helperArgs[1]).toEqual(expectedMethod);
	expect(helperArgs[2]).toEqual(expectedCancellationToken);

	if (expectedData) {
		expect(helperArgs[3]).toEqual(expectedData);
	}

	if (expectedHeaders) {
		expect(helperArgs[4]).toEqual(expectedHeaders);
	}
};