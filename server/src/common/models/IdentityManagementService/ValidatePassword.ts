import MINIMUM_PASSWORD_LENGTH from "./MinimumPasswordLength";

import { ArgumentException, ArgumentNullException } from "../errors/errors";

const validatePassword = (password: string) => {
    if (!password) {
        throw new ArgumentNullException("password");
    }

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
        throw new ArgumentException("password", `Password length cannot be less than ${MINIMUM_PASSWORD_LENGTH} characters`);
    }
}

export default validatePassword;