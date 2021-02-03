import React, { useContext, useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";

import MainTitle from "../../hoc/MainTitle/MainTitle";
import Main from "../../hoc/Main/Main";
import UserRow from "./UserRow/UserRow";
import { UserContext } from "../../context/user/UserContext";

import classes from "./Users.module.scss";
import NewUserRow from "./NewUserRow/NewUserRow";
import Button from "../../components/UI/Button/Button";

const Users = () => {
    const {
        status,
        updatedUsers,
        newUsers,
        usersHaveChanges,
        getUsers,
        addNewUser,
        saveChanges,
        cancelChanges
    } = useContext(UserContext);

    const cancellationTokenSource = axios.CancelToken.source();

    useEffect(() => {
        const getUsersAsync = async () => {
            await getUsers(cancellationTokenSource.token);
        }

        getUsersAsync();

        return () => {
            if (status === "LOADING") {
                cancellationTokenSource.cancel();
            }
        }

        // eslint-disable-next-line
    }, []);

    return (
        <>
            <MainTitle title="User Management" />

            <Main>
                <section className={classes.Users}>
                    <div className={classes.block}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Activated</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <>
                                    {status === "LOADING" &&
                                        <TableRow className={classes.emptyTableRow}>
                                            <TableCell colSpan={6} className={classes.emptyTableCell}>
                                                <h2>Loading...</h2>
                                            </TableCell>
                                        </TableRow>
                                    }

                                    {status === "ERROR" &&
                                        <TableRow className={classes.emptyTableRow}>
                                            <TableCell colSpan={6} className={classes.emptyTableCell}>
                                                <h2>Error Getting Users</h2>
                                            </TableCell>
                                        </TableRow>
                                    }

                                    {status === "LOADED" &&
                                        <>
                                            {updatedUsers.map((user) => {
                                                return (<UserRow key={user.id} user={user} />);
                                            })}

                                            {newUsers.map((newUser, index) => {
                                                if (!newUser.deleted) {
                                                    return (
                                                        <NewUserRow key={index} index={index} newUser={newUser} />
                                                    );
                                                }

                                                return null;
                                            })}

                                            <TableRow className={classes.newUserRow}>
                                                <TableCell
                                                    className={classes.newUserCell}
                                                    colSpan={6}
                                                    onClick={() => addNewUser()}>
                                                    +
                                                    </TableCell>
                                            </TableRow>
                                        </>
                                    }
                                </>
                            </TableBody>
                        </Table>
                    </div>

                    {usersHaveChanges && status !== "LOADING" &&
                        <div className={classes.buttons}>
                            <Button
                                externalStyles={classes.cancelButton}
                                onButtonClick={() => cancelChanges()}
                                buttonType="button">Cancel Changes</Button>
                            <Button
                                externalStyles={classes.saveButton}
                                onButtonClick={() => saveChanges(cancellationTokenSource.token)}
                                buttonType="button">Save Changes</Button>
                        </div>
                    }
                </section>
            </Main>
        </>
    );
}

export default Users;