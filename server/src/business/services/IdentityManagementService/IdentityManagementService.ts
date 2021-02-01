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
import { SaveUserChangesRequest } from "../../../common/models/IdentityManagementService/SaveUserChanges/SaveUserChangesRequest";

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
                request.url, request.username, request.password, cancellationToken);

            if (!response.token) {
                throw new Error("User Token cannot be null");
            }

            const user = new User(
                response.id,
                response.firstName,
                response.lastName,
                response.username,
                response.username
            );

            authenticateResponse = new AuthenticateResponse(user, response.token);

            this.logger.info(`Authenticated user: ${response.username}`);
        }
        catch (error) {
            this.logger.error(`Couldn't authenticate user: ${request.username}`);
            throw error;
        }

        return authenticateResponse;
    }

    // newUser = async (request: NewUserRequest, cancellationToken: CancelToken) => {
    //     let newUserResponse: NewUserResponse;

    //     try {
    //         this.logger.info(`Attempting to create user ${request.newUser.username}`);

    //         const response = await IdentityManagementApi.newUser(
    //             request.url, request.newUser, cancellationToken);

    //         newUserResponse = new NewUserResponse(response.message);

    //         this.logger.info(`New user created: ${request.newUser.username}`);
    //     }
    //     catch (error) {
    //         this.logger.error(`Could not create user: ${request.newUser.username}`);
    //         throw error;
    //     }

    //     return newUserResponse;
    // }

    newUser = async (request: NewUserRequest, cancellationToken: CancelToken) => {
        try {
            this.logger.info(`Attempting to create user ${request.newUser.username}`);

            const response = await IdentityManagementApi.newUser(
                request.url, request.newUser, cancellationToken);

            this.logger.info(`New user created: ${request.newUser.username}`);

            return response;
        }
        catch (error) {
            this.logger.error(`Could not create user: ${request.newUser.username}`);
            throw error;
        }
    }

    forgotPassword = async (request: ForgotPasswordRequest, cancellationToken: CancelToken) => {
        let forgotPasswordResponse: ForgotPasswordResponse;

        try {
            this.logger.info(`Forgotten password request for user: ${request.username}`);

            const response = await IdentityManagementApi.forgotPassword(request.url, request.username, cancellationToken);

            forgotPasswordResponse = new ForgotPasswordResponse(response.message);

            this.logger.info(`Sent forgotten password response to user: ${request.username}`);
        }
        catch (error) {
            this.logger.error(`Error sending forgotten password request for user: ${request.username}`);
            throw error;
        }

        return forgotPasswordResponse;
    }

    validateResetToken = async (request: ValidateResetTokenRequest, cancellationToken: CancelToken) => {
        let validateResetTokenResponse: ValidateResetTokenResponse;

        try {
            this.logger.info(`Validating Token`);

            const response = await IdentityManagementApi.validateResetToken(
                request.url, request.token, cancellationToken);

            validateResetTokenResponse = new ValidateResetTokenResponse(response.message);

            this.logger.info(`Token Validated`);
        }
        catch (error) {
            this.logger.error(`Error validating token`);
            throw error;
        }

        return validateResetTokenResponse;
    }

    resetPassword = async (request: ResetPasswordRequest, cancellationToken: CancelToken) => {
        let resetPasswordResponse: ResetPasswordResponse;

        try {
            this.logger.info(`Resetting Password`);

            const response = await IdentityManagementApi.resetPassword(
                request.url, request.token, request.password, cancellationToken);

            resetPasswordResponse = new ResetPasswordResponse(response.message);

            this.logger.info(`Password Reset`);
        }
        catch (error) {
            this.logger.error(`Error Resetting Password`);
            throw error;
        }

        return resetPasswordResponse;
    };

    getUsers = async (getUsersUrl: string, cancellationToken: CancelToken, authToken?: string) => {
        let users: User[];

        try {
            this.logger.info(`Retrieving Users from the Identity Management Service`);

            const response = await IdentityManagementApi.getUsers(getUsersUrl, cancellationToken, authToken);
            users = response;

            this.logger.info(`Users Retrieved from the Identity Management Service`);
        }
        catch (error) {
            this.logger.error(`Error Retrieving Users`);
            throw error;
        }

        return users;
    };

    saveChanges = async (request: SaveUserChangesRequest, cancellationToken: CancelToken, authToken?: string) => {
        if (request.updatedUsers) {
            const updatedUserIds = request.updatedUsers.map(user => user.id);
            this.logger.info(`Attempting to Update Users: ${JSON.stringify(updatedUserIds)}`)
        }
        const update = request.updatedUsers.map(user => {
            return IdentityManagementApi.updateUser(request.updateUserUrl, user, cancellationToken, authToken);
        });

        const newUsersRequests = request.newUsers.map(newUser => {
            return IdentityManagementApi.newUser(request.newUserUrl, newUser, cancellationToken);
        });

        if (request.deletedUsers) {
            this.logger.info(`Attempting to Update Users: ${JSON.stringify(request.deletedUsers)}`)
        }
        const deleted = request.deletedUsers.map(deletedUser => {
            return IdentityManagementApi.deleteUser(request.deleteUserUrl, deletedUser, cancellationToken, authToken);
        })

        const requestChain = update.concat(newUsersRequests).concat(deleted);
        await Promise.all(requestChain);
    }

    getUser: (getUserUrl: string, userId: Guid, cancellationToken: CancelToken) => Promise<User>;
    updateUser: (updateUserUrl: string, userId: Guid, cancellationToken: CancelToken) => Promise<void>;
    deleteUser: (deleteUserUrl: string, userId: Guid, cancellationToken: CancelToken) => Promise<void>;
}

export default IdentityManagementService;