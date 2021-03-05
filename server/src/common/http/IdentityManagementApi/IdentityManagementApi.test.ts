import IdentityManagementApi from "./IdentityManagementApi";
import { stub, SinonStub } from "sinon";
import axios, { CancelToken } from "axios";
import axiosHelper from "../../helpers/AxiosHelper";

const axiosHelperStub = stub(axiosHelper).resolves("");

const url = "www.glasswall.com";
let cancellationToken: CancelToken;

const setUpCancellationToken = () => {
	const cancellationTokenSource = axios.CancelToken.source();
	cancellationToken = cancellationTokenSource.token;
};