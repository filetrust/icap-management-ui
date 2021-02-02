import React, { useState, useContext, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import iconUser from "../../assets/user-icon.svg";
import iconPass from "../../assets/password-icon.svg";

import { UserContext } from "../../context/user/UserContext";
import MINIMUM_PASSWORD_LENGTH from "../../../../src/common/models/IdentityManagementService/MinimumPasswordLength";

import GlasswallLogo from "../../components/GlasswallLogo/GlasswallLogo";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import classes from "./Login.module.scss";

const Login = () => {
	const cancellationTokenSource = axios.CancelToken.source();

	const { status, login } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const submitCredentials = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		login(username, password, cancellationTokenSource.token);
	};

	return (
		<section className={classes.login}>
			<GlasswallLogo className={classes.logo} />
			<div className={classes.loginContainer}>
				<form onSubmit={submitCredentials}>
					<Input
						data-test-id="inputUsername"
						type="text"
						name="username"
						placeholder="Username"
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setUsername(event.currentTarget.value);
						}}
						externalStyles={classes.inputContainer}
						style={{
							backgroundImage: `url(${iconUser})`
						}}
						required
						disabled={status === "LOADING"}
					/>

					<Input
						data-test-id="inputPassword"
						type="password"
						name="password"
						placeholder="Password"
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setPassword(event.currentTarget.value);
						}}
						externalStyles={classes.inputContainer}
						style={{
							backgroundImage: `url(${iconPass})`
						}}
						required
						minLength={MINIMUM_PASSWORD_LENGTH}
						disabled={status === "LOADING"}
						loading={status === "LOADING"}
					/>

					<p className={classes.linkTerms}>
						By logging in your agree to the &nbsp;
						<a href="/">terms of use</a>
					</p>

					<Button
						data-test-id="buttonLogin"
						buttonType={"submit"}
						disabled={status === "LOADING"}>Log In</Button>
				</form>
				<p className={classes.rePassLink}>
					<Link data-test-id="linkForgottenPassword" to={"/forgot-password"}>Forgotten password?</Link>
				</p>
			</div>
		</section>
	);
};

export default Login;
