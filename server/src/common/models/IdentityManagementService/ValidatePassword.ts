import MINIMUM_PASSWORD_LENGTH from "./MinimumPasswordLength";

import ArgumentException from "../errors/ArgumentException";
import ArgumentNullException from "../errors/ArgumentNullException"

const validatePassword = (password: string) => {
    if (!password) {
        throw new ArgumentNullException("password");
    }

    if (password.length) {
        throw new ArgumentException("password", `Password length cannot be less than ${MINIMUM_PASSWORD_LENGTH} characters`);
    }
}

export default validatePassword;