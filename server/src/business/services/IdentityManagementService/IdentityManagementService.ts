import { Logger } from "winston";
import { Guid } from "guid-typescript";
import { CancelToken } from "axios";
import IdentityManagementApi from "../../../common/http/IdentityManagementApi/IdentityManagementApi";
import IIdentityManagementService from "../../../common/services/IIdentityManagementService";
import { AuthenticateRequest, AuthenticateResponse } from "../../../common/models/IdentityManagementService/Authenticate";
import { ForgotPasswordRequest } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordRequest";
import { NewUserRequest, NewUserResponse } from "../../../common/models/IdentityManagementService/NewUser";
import { ResetPasswordRequest, ResetPasswordResponse } from "../../../common/models/IdentityManagementService/ResetPassword";
import { ValidateResetTokenRequest, ValidateResetTokenResponse } from "../../../common/models/IdentityManagementService/ValidateResetToken";
import { ForgotPasswordResponse } from "../../../common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import User from "../../../common/models/IdentityManagementService/User/User";

class IdentityManagementService implements IIdentityManagementService {
    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    authenticate = async (request: AuthenticateRequest, cancellationToken: CancelToken) => {
        let authenticateResponse: AuthenticateResponse;

        try {
            this.logger.info(`Attempting to authenticate user: ${request.username}`);

            const response = await IdentityManagementApi.authenticate(
               request.url, request.username, request.password, cancellationToken, { "Content-Type": "application/json" });

            authenticateResponse = new AuthenticateResponse(
                response.id, response.username, response.firstName, response.lastName, response.token);

            this.logger.info(`Authenticated user: ${response.username}`);
        }
        catch (error) {
            this.logger.error(`Couldn't authenticate user: ${request.username}`);
            throw error;
        }

        return authenticateResponse;
    }

    newUser = async (request: NewUserRequest, cancellationToken: CancelToken) => {
        let newUserResponse: NewUserResponse;

        try {
            this.logger.info(`Attempting to create user ${request.newUser.username}`);

            const response = await IdentityManagementApi.newUser(
                request.url, request.newUser, cancellationToken, { "Content-Type": "application/json" });

            newUserResponse = new NewUserResponse(response.message);

            this.logger.info(`New user created: ${request.newUser.username}`);
        }
        catch (error) {
            this.logger.error(`Could not create user: ${request.newUser.username}`);
            throw error;
        }

        return newUserResponse;
    }

    forgotPassword = async (request: ForgotPasswordRequest, cancellationToken: CancelToken) => {
        let forgotPasswordResponse: ForgotPasswordResponse;

        try {
            this.logger.info(`Forgotten password request for user: ${request.username}`);

            const response = await IdentityManagementApi.forgotPassword(request.url, request.username, cancellationToken);

            forgotPasswordResponse = new ForgotPasswordResponse(response.message);

            this.logger.info(`Sent forgotten password response to user: ${request.username}`);
        }
        catch(error) {
            this.logger.error(`Error sending forgotten password request for user: ${request.username}`);
            throw error;
        }

        return forgotPasswordResponse;
    }

    validateResetToken: (request: ValidateResetTokenRequest, cancellationToken: CancelToken) => Promise<ValidateResetTokenResponse>;
    resetPassword: (request: ResetPasswordRequest, cancellationToken: CancelToken) => Promise<ResetPasswordResponse>;
    getUsers: (getUsersUrl: string, cancellationToken: CancelToken) => Promise<User[]>;
    getUser: (getUserUrl: string, userId: Guid, cancellationToken: CancelToken) => Promise<User>;
    updateUser: (updateUserUrl: string, userId: Guid, cancellationToken: CancelToken) => Promise<void>;
    deleteUser: (deleteUserUrl: string, userId: Guid, cancellationToken: CancelToken) => Promise<void>;
}

export default IdentityManagementService;