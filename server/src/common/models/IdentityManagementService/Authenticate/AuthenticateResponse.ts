import { ArgumentNullException } from "../../../../common/models/errors/errors";
import User from "../../../../common/models/IdentityManagementService/User/User";

export class AuthenticateResponse {
    user: User;
    token: string;

    constructor(user: User, token: string) {
        if (!user) {
            throw new ArgumentNullException("user");
        }
        this.user = user;

        if (!token) {
            throw new ArgumentNullException("token");
        }
        this.token = token;
    }
}