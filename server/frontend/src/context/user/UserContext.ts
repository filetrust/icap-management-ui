import { CancelToken } from "axios";
import { createContext } from "react";
import NewUser from "../../../../src/common/models/IdentityManagementService/NewUser/NewUser";
import User from "../../../../src/common/models/IdentityManagementService/User/User";

export type TUserState = {
    currentUser: User,
    status: "LOADING" | "ERROR" | "LOADED",
    usersHaveChanges: boolean,
    users: User[],
    updatedUsers: User[],
    newUsers: NewUser[],
    getUsers: (cancellationToken: CancelToken) => Promise<void>,
    login: (username: string, password: string, cancellationToken: CancelToken) => void,
    logout: () => void,
    editUser: (user: User) => void,
    addNewUser: () => void,
    deleteNewUser: (index: number) => void,
    editNewUser: (user: NewUser, index: number) => void,
    saveChanges: (cancellationToken: CancelToken) => Promise<void>,
    cancelChanges: () => void
}

export const UserContext = createContext<TUserState | null>(null);