import axios, { CancelToken } from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, Redirect, RouteProps } from "react-router-dom";
import IdentityManagementService from "../../service/UsersService/IdentityManagementService";

import GlasswallLogo from "../../components/GlasswallLogo/GlasswallLogo";

import classes from "./Confirm.module.scss";
import Button from "../../components/UI/Button/Button";

const Confirm = (props: RouteProps) => {
    const [status, setStatus] = useState<"LOADING" | "LOADED" | "ERROR">("LOADING");
    const [token] = useState<string>(new URLSearchParams(props.location.search).get('token'));

    const cancellationTokenSource = axios.CancelToken.source();
    const identityManagementService = new IdentityManagementService();

    useEffect(() => {
        const sendToken = async (cancellationToken: CancelToken) => {
            try {
                await identityManagementService.confirm(token, cancellationToken);
                setStatus("LOADED");
            }
            catch (error) {
                setStatus("ERROR");
                console.log(error);
            }
        }

        if (token) {
            sendToken(cancellationTokenSource.token);
        }
        else {
            setStatus("LOADED");
        }

        return () => {
            if (status === "LOADING") {
                cancellationTokenSource.cancel();
            }
        }

        // eslint-disable-next-line
    }, []);

    return (
        <section>
            <GlasswallLogo className={classes.logo} />

            <div className={classes.wrapper}>
                {status === "ERROR" &&
                    <div className={classes.error}>
                        <h2>
                            An Error Occurred While Confirming your Account Details
                        </h2>

                        <div className={classes.backButton}>
                            <Link to={"/"}>
                                <Button data-test-id="buttonBack" buttonType="button">Back</Button>
                            </Link>
                        </div>
                    </div>
                }

                {status === "LOADED" && token !== null &&
                    <Redirect to={`/reset?token=${token}`} />
                }

                {status === "LOADED" && token === null &&
                    <Redirect to="/" />
                }
            </div>
        </section>
    );
}

export default Confirm;