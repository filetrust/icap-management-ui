import { NewUserResponse } from "../../../../src/common/models/IdentityManagementService/NewUser";
import IIdentityManagmentService from "./IIdentityManagementService";
import { CancelToken } from "axios";
import Routes, { IRoutes } from "../../Routes";
import axiosRequestHelper from "../../helpers/axiosRequestHelper";

export default class IdentityManagementService implements IIdentityManagmentService {
	routes: IRoutes["usersRoutes"];

	constructor() {
		this.routes = new Routes().usersRoutes;
	}

	login = (username: string, password: string, cancellationToken: CancelToken) => {
		return axiosRequestHelper(this.routes.login, "POST", cancellationToken, { username, password });
	}

	register: () => Promise<NewUserResponse>;

	forgotPassword = (username: string, cancellationToken: CancelToken) => {
		return axiosRequestHelper(this.routes.forgotPassword, "POST", cancellationToken, { username });
	}

	confirm = (token: string, cancellationToken: CancelToken) => {
		return axiosRequestHelper(this.routes.validateResetToken, "POST", cancellationToken, { token });
	}

	resetPassword = (token: string, password: string, cancellationToken: CancelToken) => {
		return axiosRequestHelper(this.routes.resetPassword, "POST", cancellationToken, { password, token });
	}

	getUsers = (cancellationToken: CancelToken) => {
		return axiosRequestHelper(this.routes.getUsers, "GET", cancellationToken);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	save = (saveData: any, cancellationToken: CancelToken) => {
		return axiosRequestHelper(this.routes.save, "POST", cancellationToken, saveData);
	}
}