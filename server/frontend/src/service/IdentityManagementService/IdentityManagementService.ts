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

	login = async (username: string, password: string, cancellationToken: CancelToken) => {
		const user = await axiosRequestHelper(
			this.routes.login, "POST", cancellationToken, { username, password });

		return user;
	}

	register: () => Promise<NewUserResponse>;

	forgotPassword = async (username: string, cancellationToken: CancelToken) => {
		const forgotPasswordResponse = await axiosRequestHelper(
			this.routes.forgotPassword, "POST", cancellationToken, { username });

		return forgotPasswordResponse;
	}

	confirm = async (token: string, cancellationToken: CancelToken) => {
		const confirmResponse = await axiosRequestHelper(
			this.routes.validateResetToken, "POST", cancellationToken, { token });

		return confirmResponse;
	}

	resetPassword = async (token: string, password: string, cancellationToken: CancelToken) => {
		const resetResponse = await axiosRequestHelper(
			this.routes.resetPassword, "POST", cancellationToken, { password, token });

		return resetResponse;
	}

	getUsers = async (cancellationToken: CancelToken) => {
		const getUsersResponse = await axiosRequestHelper(this.routes.getUsers, "GET", cancellationToken);

		return getUsersResponse;
	}

	save = async (saveData: any, cancellationToken: CancelToken) => {
		const saveChangesResponse = await axiosRequestHelper(this.routes.save, "POST", cancellationToken, saveData);

		return saveChangesResponse;
	}
}