import { CancelToken } from "axios";
import { ForgotPasswordResponse } from "../../../../src/common/models/IdentityManagementService/ForgotPassword/ForgotPasswordResponse";
import { NewUserResponse } from "../../../../src/common/models/IdentityManagementService/NewUser";
import { ResetPasswordResponse } from "../../../../src/common/models/IdentityManagementService/ResetPassword";
import User from "../../../../src/common/models/IdentityManagementService/User/User";
import { ValidateResetTokenResponse } from "../../../../src/common/models/IdentityManagementService/ValidateResetToken";

export default interface IIdentityManagmentService {
    login: (username: string, password: string, cancellationToken: CancelToken) => Promise<User>;
    register: () => Promise<NewUserResponse>;
    forgotPassword: (username: string, cancellationToken: CancelToken) => Promise<ForgotPasswordResponse>;
    confirm: (token: string, cancellationToken: CancelToken) => Promise<ValidateResetTokenResponse>;
    resetPassword: (token: string, password: string, cancellationToken: CancelToken) => Promise<ResetPasswordResponse>;
}