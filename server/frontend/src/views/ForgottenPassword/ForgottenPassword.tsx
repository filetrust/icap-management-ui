import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ReactComponent as PasswordIcon } from "../../assets/password-icon.svg";
import { ReactComponent as SubjectIcon } from "../../assets/subject-icon.svg";
import userIcon from "../../assets/user-icon.svg";

import GlasswallLogo from "../../components/GlasswallLogo/GlasswallLogo";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import IdentityManagementService from "../../service/IdentityManagementService/IdentityManagementService";

import classes from "./ForgottenPassword.module.scss";

const ForgottenPassword = () => {
    const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">(null);
    const [username, setUsername] = useState<string>(null);
    const [message, setMessage] = useState<string>(null);

    const cancellationTokenSource = axios.CancelToken.source();
    const identityManagementService = new IdentityManagementService();

    const submitForgottenPassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("LOADING");

        try {
            const response = await identityManagementService.forgotPassword(
                username, cancellationTokenSource.token);
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
                        An Error Occurred While Sending the Forgotten Password Request
                        </h2>

                    <div className={classes.backButtonWrapper}>
                        <Link to={"/"}>
                            <Button data-test-id="buttonBack" buttonType="button">Back</Button>
                        </Link>
                    </div>
                </div>
            }

            <div className={classes.wrapper}>
                {(status === null || status === "LOADING") &&
                    <>
                        <h2 className={classes.heading}>
                            <PasswordIcon className={classes.icon} viewBox={"0 0 44 44"} />
					        Forgotten Password
				        </h2>
                        <p className={classes.message}>
                            Please enter your username. A link will be sent to the email
                            address associated with your account, allowing you to create a new
                            password.
				        </p>

                        <form onSubmit={submitForgottenPassword}>
                            <Input
                                type="string"
                                name="username"
                                placeholder="Username"
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setUsername(event.target.value);
                                }}
                                externalStyles={classes.inputContainer}
                                style={{
                                    backgroundImage: `url(${userIcon})`,
                                }}
                                required
                                disabled={status === "LOADING"}
                                loading={status === "LOADING"}
                            />
                            <div className={classes.submitButtonWrapper}>
                                <Link to={"/"}>
                                    <Button data-test-id="buttonCancel" buttonType="button">Cancel</Button>
                                </Link>
                                <Button data-test-id="buttonSendLink" buttonType="submit">Send link</Button>
                            </div>
                        </form>
                    </>
                }

                {status === "LOADED" &&
                    <>
                        <h2 className={classes.heading}>
                            <SubjectIcon className={classes.icon} viewBox={"0 0 44 44"} />
                            Email Sent
                        </h2>

                        <p className={classes.message}>
                            {message}
                        </p>

                        <div className={classes.loginButtonWrapper}>
                            <Link to={"/"}>
                                <Button data-test-id="buttonBack" buttonType={"button"}>Back</Button>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </section>
    );
}

export default ForgottenPassword;