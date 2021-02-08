import React, { useReducer } from "react";
import { CancelToken } from "axios";
import { ToastContainer, toast } from 'react-toastify';

import { UserContext } from "./UserContext";
import { userReducer } from "./user-reducers";
import * as actionTypes from "../actionTypes";

import User from "../../../../src/common/models/IdentityManagementService/User/User";
import NewUser from "../../../../src/common/models/IdentityManagementService/NewUser/NewUser";

import IdentityManagementService from "../../service/IdentityManagementService/IdentityManagementService";
import validateUser from "../../helpers/validateUser";

interface InitialUserState {
	currentUser: User | null,
	status: "LOADING" | "ERROR" | "LOADED",
	usersHaveChanges: boolean,
	users: User[],
	updatedUsers: User[],
	newUsers: NewUser[]
}

export const UserState = (props: { children: React.ReactNode }) => {
	const identityManagementService = new IdentityManagementService();

	const initialState: InitialUserState = {
		currentUser: JSON.parse(localStorage.getItem("currentUser")),
		status: "LOADED",
		usersHaveChanges: false,
		users: [],
		updatedUsers: [],
		newUsers: []
	};

	const [userState, dispatch] = useReducer(userReducer, initialState);

	const setStatus = (status: "LOADING" | "ERROR" | "LOADED") => {
		dispatch({ type: actionTypes.SET_STATUS, status });
	}

	const setCurrentUser = (user: User) => {
		dispatch({ type: actionTypes.SET_CURRENT_USER, user });
	}

	const setUsers = (users: User[]) => {
		dispatch({ type: actionTypes.SET_USERS, users });
	}

	const setUpdatedUsers = (updatedUsers: User[]) => {
		dispatch({ type: actionTypes.SET_UPDATED_USERS, updatedUsers });
	}

	const getUsers = async (cancellationToken: CancelToken) => {
		setStatus("LOADING");

		try {
			const response = await identityManagementService.getUsers(cancellationToken);
			setUsers(response);
			setUpdatedUsers(response);
			setStatus("LOADED");
		}
		catch (error) {
			setStatus("ERROR");
		}
	}

	const login = (username: string, password: string, cancellationToken: CancelToken) => {
		let status: "LOADING" | "ERROR" | "LOADED" = "LOADING";
		setStatus(status);

		(async (): Promise<void> => {
			try {
				const user = await identityManagementService.login(
					username, password, cancellationToken);

				setCurrentUser(user);
				localStorage.setItem("currentUser", JSON.stringify(user));
				status = "LOADED";
			}
			catch (error) {
				status = "ERROR";
				if (error.response) {
					if (error.response.data) {
						toast.error(error.response.data, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
					}
				}
			}
			finally {
				setStatus(status);
			}
		})();
	}

	const logout = () => {
		setCurrentUser(null);
		localStorage.removeItem("currentUser");
	}

	const editUser = (user: User) => {
		dispatch({ type: actionTypes.EDIT_USER, user });
	}

	const addNewUser = () => {
		const newUser: NewUser = {
			username: "",
			firstName: "",
			lastName: "",
			email: ""
		};

		dispatch({ type: actionTypes.ADD_NEW_USER, newUser });
	}

	const deleteNewUser = (index: number) => {
		dispatch({ type: actionTypes.DELETE_NEW_USER, index });
	}

	const editNewUser = (newUser: NewUser, index: number) => {
		dispatch({ type: actionTypes.EDIT_NEW_USER, newUser, index });
	}

	const saveChanges = async (cancellationToken: CancelToken) => {
		let valid = true;

		const updatedUsers = userState.updatedUsers
			.filter((user: User) => user.changed && !user.deleted);

		const newUsers = userState.newUsers
			.filter((newUser: NewUser) => !newUser.deleted);

		const deletedUsers = userState.updatedUsers
			.filter((user: User) => user.deleted)
			.map((user: User) => user.id);

		newUsers.forEach((user: User) => {
			if (!validateUser(user, [...userState.users, ...updatedUsers])) {
				valid = false;
			}
		});

		updatedUsers.forEach((user: User) => {
			if (!validateUser(user, userState.users)) {
				valid = false;
			}
		});

		if (valid) {
			setStatus("LOADING");

			const saveData = {
				updatedUsers,
				newUsers,
				deletedUserIds: deletedUsers
			};
			try {
				await identityManagementService.save(saveData, cancellationToken);
				window.location.reload();
			}
			catch (error) {
				setStatus("ERROR");

				// tslint:disable-next-line: no-console
				console.error(error);
			}
		}
	}

	const cancelChanges = () => {
		dispatch({ type: actionTypes.CANCEL_USERS_CHANGES });
	}

	return (
		<UserContext.Provider value={{
			currentUser: userState.currentUser,
			status: userState.status,
			usersHaveChanges: userState.usersHaveChanges,
			users: userState.users,
			updatedUsers: userState.updatedUsers,
			newUsers: userState.newUsers,
			getUsers,
			login,
			logout,
			editUser,
			addNewUser,
			deleteNewUser,
			editNewUser,
			saveChanges,
			cancelChanges
		}}>
			<ToastContainer />
			{ props.children}
		</UserContext.Provider>
	);
}