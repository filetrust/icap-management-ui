import { add } from "winston";
import NewUser from "../NewUser/NewUser";
import User from "../User/User";

export class SaveUserChangesRequest {
    updateUserUrl: string;
    newUserUrl: string;
    deleteUserUrl: string;
    updatedUsers: User[];
    newUsers: NewUser[];
    deletedUsers: string[];

    constructor(updateUserUrl: string, newUserUrl: string,
        deleteUserUrl: string, updatedUsers: User[], newUsers: NewUser[], deletedUsers: string[]) {
        this.updateUserUrl = updateUserUrl;
        this.newUserUrl = newUserUrl;
        this.deleteUserUrl = deleteUserUrl;
        this.updatedUsers = updatedUsers;
        this.newUsers = newUsers;
        this.deletedUsers = deletedUsers;
    }
}