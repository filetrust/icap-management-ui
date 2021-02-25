import equal from "deep-equal";
import { TUserState } from "./UserContext";
import User from "../../../../src/common/models/IdentityManagementService/User/User";
import { updateObject } from "../../helpers/updateObject";
import * as actionTypes from "../actionTypes";
import NewUser from "../../../../src/common/models/IdentityManagementService/NewUser/NewUser";

const setStatus = (state: TUserState, status: "LOADING" | "ERROR" | "LOADED") => {
	return updateObject(state, {
		status
	});
};

const setUsersHaveChanges = (state: TUserState, changed: boolean) => {
	return updateObject(state, {
		usersHaveChanges: changed
	});
};

const setCurrentUser = (state: TUserState, user: User) => {
	return updateObject(state, {
		currentUser: user
	});
};

const setUsers = (state: TUserState, users: User[]) => {
	return updateObject(state, {
		users
	});
};

const setUpdatedUsers = (state: TUserState, updatedUsers: User[]) => {
	return updateObject(state, {
		updatedUsers
	});
};

const editUser = (state: TUserState, user: User) => {
	let changed: boolean;

	const users = state.users.map((u: User) => {
		if (u.id === user.id) {
			changed = !equal(u, user);
		}

		return u;
	});

	const updatedUsers = state.updatedUsers.map((u: User) => {
		if (u.id === user.id) {
			u = user;
			u.changed = changed;
		}

		return u;
	});

	const usersHaveChanges = !equal(users, updatedUsers);

	return updateObject(state, {
		updatedUsers,
		users,
		usersHaveChanges
	});
};

const addNewUser = (state: TUserState, newUser: NewUser) => {
	return updateObject(state, {
		newUsers: [
			...state.newUsers,
			newUser
		],
		usersHaveChanges: true
	});
};

const deleteNewUser = (state: TUserState, index: number) => {
	const newUsers = state.newUsers;
	newUsers[index].deleted = true;

	const hasNewUsers = newUsers.filter(user => !user.deleted).length > 0;
	const usersHaveChanges = !equal(state.users, state.updatedUsers);

	return updateObject(state, {
		newUsers,
		usersHaveChanges: hasNewUsers || usersHaveChanges
	});
};

const editNewUser = (state: TUserState, newUser: NewUser, index: number) => {
	const newUsers = state.newUsers;
	newUsers[index] = newUser;

	return updateObject(state, {
		newUsers
	});
};

const cancelChanges = (state: TUserState) => {
	return updateObject(state, {
		updatedUsers: state.users,
		newUsers: [],
		usersHaveChanges: false
	});
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userReducer = (state: TUserState, action: { [actionName: string]: any }) => {
	switch (action.type) {
		case actionTypes.SET_STATUS:
			return setStatus(state, action.status);
		case actionTypes.SET_USERS_HAVE_CHANGES:
			return setUsersHaveChanges(state, action.changed);
		case actionTypes.SET_CURRENT_USER:
			return setCurrentUser(state, action.user);
		case actionTypes.SET_USERS:
			return setUsers(state, action.users);
		case actionTypes.SET_UPDATED_USERS:
			return setUpdatedUsers(state, action.updatedUsers);
		case actionTypes.EDIT_USER:
			return editUser(state, action.user);
		case actionTypes.ADD_NEW_USER:
			return addNewUser(state, action.newUser);
		case actionTypes.DELETE_NEW_USER:
			return deleteNewUser(state, action.index);
		case actionTypes.EDIT_NEW_USER:
			return editNewUser(state, action.newUser, action.index);
		case actionTypes.CANCEL_USERS_CHANGES:
			return cancelChanges(state);
		default:
			return state;
	}
};