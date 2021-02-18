import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, Redirect, RouteProps } from "react-router-dom";
import axios from "axios";

import { ReactComponent as UserIcon } from "../../assets/user-icon.svg";
import passwordIcon, { ReactComponent as PasswordIcon } from "../../assets/password-icon.svg";
import MINIMUM_PASSWORD_LENGTH from "../../../../src/common/models/IdentityManagementService/MinimumPasswordLength";

import GlasswallLogo from "../../components/GlasswallLogo/GlasswallLogo";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import IdentityManagementService from "../../service/IdentityManagementService/IdentityManagementService";

import classes from "./ResetPassword.module.scss";

const ResetPassword = (props: RouteProps) => {
	const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">(null);
	const [token] = useState<string>(
		new URLSearchParams(props.location.search).get("token") ?
			new URLSearchParams(props.location.search).get("token") :
			new URLSearchParams(props.location.search).get("Token"));
	const [message, setMessage] = useState<string>(null);
	const [password, setPassword] = useState<string>(null);

	const cancellationTokenSource = axios.CancelToken.source();
	const identityManagementService = new IdentityManagementService();

	const resetPassword = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStatus("LOADING");

		try {
			const response = await identityManagementService.resetPassword(
				token, password, cancellationTokenSource.token);
			setMessage(response.message);
			setStatus("LOADED");
		}
		catch (error) {
			setStatus("ERROR");
			// tslint:disable-next-line: no-console
			console.error(error);
		}
	};

	return (
		<section>
			<GlasswallLogo className={classes.logo} />

			{status === "ERROR" &&
				<div className={classes.error}>
					<h2>
						An Error Occurred While Resetting your Password
					</h2>

					<div className={classes.backButtonWrapper}>
						<Link to={"/"}>
							<Button data-test-id="buttonBack" buttonType="button">Back</Button>
						</Link>
					</div>
				</div>
			}

			<div className={classes.wrapper}>
				{token === null &&
					<Redirect to="/" />
				}

				{(status === null || status === "LOADING") &&
					<>
						<h2 className={classes.heading}>
							<PasswordIcon className={classes.icon} viewBox={"0 0 44 44"} />
                            New Password
						</h2>

						<p className={classes.message}>
							Please enter a new password below.
                            The minimum character length for new passwords is {MINIMUM_PASSWORD_LENGTH}.
						</p>

						<form onSubmit={resetPassword}>
							<Input
								type="password"
								name="password"
								placeholder="Password"
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									setPassword(event.target.value);
								}}
								externalStyles={classes.inputContainer}
								style={{
									backgroundImage: `url(${passwordIcon})`,
								}}
								required
								minLength={MINIMUM_PASSWORD_LENGTH}
								disabled={status === "LOADING"}
								loading={status === "LOADING"} />

							<div className={classes.submitButtonWrapper}>
								<Link to={"/"}>
									<Button data-test-id="buttonCancel" buttonType={"button"}>Cancel</Button>
								</Link>

								<Button data-test-id="buttonSubmit" buttonType={"submit"}>Submit</Button>
							</div>
						</form>
					</>
				}

				{status === "LOADED" &&
					<>
						<h2 className={classes.heading}>
							<UserIcon className={classes.icon} viewBox={"0 0 44 44"} />
                            Password Reset
						</h2>

						<p className={classes.message}>
							{message}
						</p>

						<div className={classes.loginButtonWrapper}>
							<Link to={"/"}>
								<Button data-test-id="buttonLogin" buttonType={"button"}>Login</Button>
							</Link>
						</div>
					</>
				}
			</div>
		</section>
	);
};

export default ResetPassword;