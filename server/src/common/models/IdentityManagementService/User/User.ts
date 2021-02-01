import { UserStatus } from "../../enums/UserStatus";
import { ArgumentNullException } from "../../errors/errors";
import NewUser from "../NewUser/NewUser";

export default class User extends NewUser {
    id: string;
    status?: UserStatus;
    changed?: boolean;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        status?: UserStatus,
        changed?: boolean,
        deleted?: boolean
    ) {
        super(firstName, lastName, username, email, deleted);

        if (!id) {
            throw new ArgumentNullException("id");
        }
        this.id = id;
        this.status = status;
        this.changed = changed;
    }
}