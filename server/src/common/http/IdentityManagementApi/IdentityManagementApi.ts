import { CancelToken } from "axios";
import axiosHelper from "../../helpers/AxiosHelper";
import User from "../../../common/models/IdentityManagementService/User/User";
import { ForgotPasswordResponse } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import NewUser from "../../../common/models/IdentityManagementService/NewUser/NewUser";
import { ValidateResetTokenResponse } from "../../../common/models/IdentityManagementService/ValidateResetToken";
import { ResetPasswordResponse } from "../../../common/models/IdentityManagementService/ResetPassword";

export default class IdentityManagementApi {
    static authenticate = async (
        authenticateUrl: string,
        username: string,
        password: string,
        cancellationToken: CancelToken,
    ): Promise<{
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        token: string,
    }> => {
        return await axiosHelper(authenticateUrl, "POST", cancellationToken, { username, password });
    }

    static newUser = async (
        newUserUrl: string,
        newUser: NewUser,
        cancellationToken: CancelToken
    ): Promise<void> => {
        return await axiosHelper(newUserUrl, "POST", cancellationToken, newUser);
    }

    static forgotPassword = async (
        forgotPasswordUrl: string,
        username: string,
        cancellationToken: CancelToken,
    ): Promise<ForgotPasswordResponse> => {
        return await axiosHelper(forgotPasswordUrl, "POST", cancellationToken, { username });
    }

    static validateResetToken = async (
        validateResetTokenUrl: string,
        token: string,
        cancellationToken: CancelToken
    ): Promise<ValidateResetTokenResponse> => {
        return await axiosHelper(validateResetTokenUrl, "POST", cancellationToken, { token });
    }

    static resetPassword = async (
        resetPasswordUrl: string,
        token: string,
        password: string,
        cancellationToken: CancelToken
    ): Promise<ResetPasswordResponse> => {
        return await axiosHelper(resetPasswordUrl, "POST", cancellationToken, { token, password });
    }

    static getUsers = async (
        getUsersUrl: string,
        cancellationToken: CancelToken,
        authToken: string // TODO: Review need for this in the identity management service
    ): Promise<User[]> => {
        return await axiosHelper(getUsersUrl, "GET", cancellationToken, null, { "Authorization": `Bearer ${authToken}` });
    }

    static updateUser = async (
        updateUserUrl: string,
        user: User,
        cancellationToken: CancelToken,
        authToken: string
    ): Promise<void> => {
        const url = `${updateUserUrl}/${user.id}`;

        return await axiosHelper(url, "PUT", cancellationToken, { ...user }, { "Authorization": `Bearer ${authToken}` });
    }

    static deleteUser = async (
        deleteUserUrl: string,
        userId: string,
        cancellationToken: CancelToken,
        authToken: string
    ): Promise<void> => {
        const url = `${deleteUserUrl}/${userId}`;

        return await axiosHelper(url, "DELETE", cancellationToken, null, { "Authorization": `Bearer ${authToken}` });
    }
}