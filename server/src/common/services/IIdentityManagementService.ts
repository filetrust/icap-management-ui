import { Guid } from "guid-typescript";
import { Logger } from "winston";
import { CancelToken } from "axios";
import { AuthenticateRequest, AuthenticateResponse } from "../models/IdentityManagementService/Authenticate";
import { NewUserRequest, NewUserResponse } from "../models/IdentityManagementService/NewUser";
import { ForgotPasswordRequest } from "../models/IdentityManagementService/ForgotPassword/ForgotPasswordRequest";
import { ForgotPasswordResponse } from "../models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { ValidateResetTokenRequest, ValidateResetTokenResponse } from "../models/IdentityManagementService/ValidateResetToken";
import { ResetPasswordRequest, ResetPasswordResponse } from "../models/IdentityManagementService/ResetPassword";
import User from "../models/IdentityManagementService/User/User";
import { SaveUserChangesRequest } from "../models/IdentityManagementService/SaveUserChanges/SaveUserChangesRequest";

export default interface IIdentityManagementService {
    logger: Logger,
    authenticate: (request: AuthenticateRequest, cancellationToken: CancelToken) => Promise<AuthenticateResponse>,
    // newUser: (request: NewUserRequest, cancellationToken: CancelToken) => Promise<NewUserResponse>,
    newUser: (request: NewUserRequest, cancellationToken: CancelToken) => Promise<void>,
    forgotPassword: (request: ForgotPasswordRequest, cancellationToken: CancelToken) => Promise<ForgotPasswordResponse>,
    validateResetToken: (request: ValidateResetTokenRequest, cancellationToken: CancelToken) => Promise<ValidateResetTokenResponse>,
    resetPassword: (request: ResetPasswordRequest, cancellationToken: CancelToken) => Promise<ResetPasswordResponse>,
    getUsers: (getUsersUrl: string, cancellationToken: CancelToken) => Promise<User[]>,
    getUser: (getUserUrl: string, userId: Guid, cancellationToken: CancelToken) => Promise<User>,
    updateUser: (updateUserUrl: string, userId: Guid, cancellationToken: CancelToken) => Promise<void>,
    deleteUser: (deleteUserUrl: string, userId: Guid, cancellationToken: CancelToken) => Promise<void>,
    saveChanges: (request: SaveUserChangesRequest, cancellationToken: CancelToken) => Promise<void>
}