import { CancelToken } from "axios";
import axiosHelper from "../../helpers/AxiosHelper";
import User from "../../../common/models/IdentityManagementService/User/User";
import { ForgotPasswordResponse } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import NewUser from "../../../common/models/IdentityManagementService/NewUser/NewUser";
import { ValidateResetTokenResponse } from "../../../common/models/IdentityManagementService/ValidateResetToken";
import { ResetPasswordResponse } from "../../../common/models/IdentityManagementService/ResetPassword";

export default class IdentityManagementApi {
    static authenticate = (
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
        return axiosHelper(authenticateUrl, "POST", cancellationToken, { username, password });
    }

    static newUser = (
        newUserUrl: string,
        newUser: NewUser,
        cancellationToken: CancelToken
    ): Promise<void> => {
        return axiosHelper(newUserUrl, "POST", cancellationToken, newUser);
    }

    static forgotPassword = (
        forgotPasswordUrl: string,
        username: string,
        cancellationToken: CancelToken,
    ): Promise<ForgotPasswordResponse> => {
        return axiosHelper(forgotPasswordUrl, "POST", cancellationToken, { username });
    }

    static validateResetToken = (
        validateResetTokenUrl: string,
        token: string,
        cancellationToken: CancelToken
    ): Promise<ValidateResetTokenResponse> => {
        return axiosHelper(validateResetTokenUrl, "POST", cancellationToken, { token });
    }

    static resetPassword = (
        resetPasswordUrl: string,
        token: string,
        password: string,
        cancellationToken: CancelToken
    ): Promise<ResetPasswordResponse> => {
        return axiosHelper(resetPasswordUrl, "POST", cancellationToken, { token, password });
    }

    static getUsers = (
        getUsersUrl: string,
        cancellationToken: CancelToken,
        authToken: string // TODO: Review need for this in the identity management service
    ): Promise<User[]> => {
        return axiosHelper(getUsersUrl, "GET", cancellationToken, null, { "Authorization": `Bearer ${authToken}` });
    }

    static updateUser = (
        updateUserUrl: string,
        user: User,
        cancellationToken: CancelToken,
        authToken: string
    ): Promise<void> => {
        const url = `${updateUserUrl}/${user.id}`;

        return axiosHelper(url, "PUT", cancellationToken, { ...user }, { "Authorization": `Bearer ${authToken}` });
    }

    static deleteUser = (
        deleteUserUrl: string,
        userId: string,
        cancellationToken: CancelToken,
        authToken: string
    ): Promise<void> => {
        const url = `${deleteUserUrl}/${userId}`;

        return axiosHelper(url, "DELETE", cancellationToken, null, { "Authorization": `Bearer ${authToken}` });
    }
}