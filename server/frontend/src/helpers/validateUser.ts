import { toast, ToastOptions } from "react-toastify";
import User from "../../../src/common/models/IdentityManagementService/User/User";

import validateEmail from "./validateEmail";

const _toastOptions: ToastOptions = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};


const validateUser = (user: User, users: User[]) => {
	const uniqueUsernameMessage = `Usernames must be unique. User: ${user.username} already exists.`;
	const uniqueEmailMessage = `Email Addresses must be unique. A user with email: ${user.email} already exists`;

	if (!user.username) {
		toast.error("Usernames must not be blank.", _toastOptions);
		return false;
	}

	if (!user.firstName) {
		toast.error("First Names must not be blank.", _toastOptions);
		return false;
	}

	if (!user.lastName) {
		toast.error("Last Names must not be blank.", _toastOptions);
		return false;
	}

	if (!user.email) {
		toast.error("Email Addresses must not be blank.", _toastOptions);
		return false;
	}
	if (!validateEmail(user.email)) {
		toast.error(`Email Address: ${user.email} is invalid`);
		return false;
	}

	if (!user.id) {
		// new user
		if (users.some(u => u.username === user.username)) {
			toast.error(uniqueUsernameMessage, _toastOptions);
			return false;
		}

		if (users.some(u => u.email === user.email)) {
			toast.error(uniqueEmailMessage, _toastOptions);
			return false;
		}
	}

	if (user.id) {
		// updated user
		if (users.some(u => u.username === user.username && u.id !== user.id)) {
			toast.error(uniqueUsernameMessage, _toastOptions);
			return false;
		}
	}

	return true;
};

export default validateUser;