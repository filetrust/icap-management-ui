import { UserStatus } from "../../enums/UserStatus";
import { ArgumentNullException } from "../../errors/ArgumentNullException";
import NewUser from "../NewUser/NewUser";
import User from "../User/User";
import { SaveUserChangesRequest } from "./SaveUserChangesRequest";

describe("SaveUserChangesRequest", () => {
	let error: any = null;

	const updateUserUrl = "www.glasswall.com/update";
	const newUserUrl = "www.glasswall.com/new";
	const deleteUserUrl = "www.glasswall.com/delete";

	const updatedUsers = [
		new User(
			"id",
			"firstName",
			"lastName",
			"username",
			"email@email.com",
			UserStatus.Active,
			true,
			false)
	];

	const newUsers = [
		new NewUser("firstName", "lastName", "username", "email@email.com")
	];

	const deletedUsers = [
		"id1",
		"id2"
	];

	afterEach(() => {
		error = null;
	});

	it("should_construct_with_valid_arguments", () => {
		// Act
		const saveUserChangesRequest = new SaveUserChangesRequest(
			updateUserUrl,
			newUserUrl,
			deleteUserUrl,
			updatedUsers,
			newUsers,
			deletedUsers);

		// Assert
		expect(saveUserChangesRequest.updateUserUrl).toEqual(updateUserUrl);
		expect(saveUserChangesRequest.newUserUrl).toEqual(newUserUrl);
		expect(saveUserChangesRequest.deleteUserUrl).toEqual(deleteUserUrl);
		expect(saveUserChangesRequest.updatedUsers).toEqual(updatedUsers);
		expect(saveUserChangesRequest.newUsers).toEqual(newUsers);
		expect(saveUserChangesRequest.deletedUsers).toEqual(deletedUsers);
	});

	it("should_throw_an_ArgumentNullException_if_updateUserUrl_is_empty", () => {
		// Arrange
		const expectedError = new ArgumentNullException("updateUserUrl");

		try {
			// Act
			// tslint:disable-next-line: no-unused-expression
			new SaveUserChangesRequest(
				"",
				newUserUrl,
				deleteUserUrl,
				updatedUsers,
				newUsers,
				deletedUsers);
		}
		catch (err) {
			error = err;
		}

		// Assert
		expect(error).toEqual(expectedError);
	});

	it("should_throw_an_ArgumentNullException_if_newUserUrl_is_empty", () => {
		// Arrange
		const expectedError = new ArgumentNullException("newUserUrl");

		try {
			// Act
			// tslint:disable-next-line: no-unused-expression
			new SaveUserChangesRequest(
				updateUserUrl,
				"",
				deleteUserUrl,
				updatedUsers,
				newUsers,
				deletedUsers);
		}
		catch (err) {
			error = err;
		}

		// Assert
		expect(error).toEqual(expectedError);
	});

	it("should_throw_an_ArgumentNullException_if_deleteUserUrl_is_empty", () => {
		// Arrange
		const expectedError = new ArgumentNullException("deleteUserUrl");

		try {
			// Act
			// tslint:disable-next-line: no-unused-expression
			new SaveUserChangesRequest(
				updateUserUrl,
				newUserUrl,
				"",
				updatedUsers,
				newUsers,
				deletedUsers);
		}
		catch (err) {
			error = err;
		}

		// Assert
		expect(error).toEqual(expectedError);
	});
});