import { ArgumentNullException } from "../../errors/ArgumentNullException";
import NewUser from "../NewUser/NewUser";
import User from "../User/User";

export class SaveUserChangesRequest {
    updateUserUrl: string;
    newUserUrl: string;
    deleteUserUrl: string;
    updatedUsers: User[];
    newUsers: NewUser[];
    deletedUsers: string[];

    constructor(
        updateUserUrl: string,
        newUserUrl: string,
        deleteUserUrl: string,
        updatedUsers: User[],
        newUsers: NewUser[],
        deletedUsers: string[]) {

        if (!updateUserUrl) {
            throw new ArgumentNullException("updateUserUrl");
        }
        this.updateUserUrl = updateUserUrl;

        if (!newUserUrl) {
            throw new ArgumentNullException("newUserUrl");
        }
        this.newUserUrl = newUserUrl;

        if (!deleteUserUrl) {
            throw new ArgumentNullException("deleteUserUrl");
        }
        this.deleteUserUrl = deleteUserUrl;

        this.updatedUsers = updatedUsers;
        this.newUsers = newUsers;
        this.deletedUsers = deletedUsers;
    }
}