import { UserStatus } from "../../enums/UserStatus";
import { ArgumentNullException } from "../../errors/ArgumentNullException";
import User from "./User";

describe("User", () => {
	let error: any = null;

	const id = "id";
	const firstName = "firstName";
	const lastName = "lastName";
	const username = "username";
	const email = "email@email.com";

	afterEach(() => {
		error = null;
	});

	it("should_construct_with_valid_arguments", () => {
		// Act
		const user = new User(
			id, firstName, lastName, username, email, UserStatus.Active, false, false);

		// Assert
		expect(user.id).toEqual(id);
		expect(user.firstName).toEqual(firstName);
		expect(user.lastName).toEqual(lastName);
		expect(user.username).toEqual(username);
		expect(user.email).toEqual(email);
		expect(user.status).toEqual(UserStatus.Active);
		expect(user.changed).toEqual(false);
		expect(user.deleted).toEqual(false);
	});

	it("should_throw_an_ArgumentNullException_if_id_is_empty", () => {
		// Arrange
		const expectedError = new ArgumentNullException("id");

		try {
			// Act
			// tslint:disable-next-line: no-unused-expression
			new User("", firstName, lastName, username, email);
		}
		catch(err) {
			error = err;
		}

		// Assert
		expect(error).toEqual(expectedError);
	});
});