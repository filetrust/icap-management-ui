import React, { ChangeEvent, useContext, useRef } from "react";
import { TableCell, TableRow } from "@material-ui/core";

import { ReactComponent as DeleteIcon } from "../../../assets/delete-icon-white.svg";
import Input from "../../../components/UI/Input/Input";
import NewUser from "../../../../../src/common/models/IdentityManagementService/NewUser/NewUser";
import { UserContext } from "../../../context/user/UserContext";

import classes from "./NewUserRow.module.scss";

export interface NewUserRowProps {
	newUser: NewUser,
	index: number
}

const NewUserRow = (props: NewUserRowProps) => {
	const { editNewUser, deleteNewUser } = useContext(UserContext);

	const emailInput = useRef(null);

	const updateUsername = (username: string) => {
		editNewUser(
			{
				...props.newUser,
				username
			},
			props.index
		);
	};

	const updateFirstName = (firstName: string) => {
		editNewUser(
			{
				...props.newUser,
				firstName
			},
			props.index
		);
	};

	const updateLastName = (lastName: string) => {
		editNewUser(
			{
				...props.newUser,
				lastName
			},
			props.index
		);
	};

	const updateEmail = (email: string) => {
		emailInput.current.reportValidity();

		editNewUser(
			{
				...props.newUser,
				email
			},
			props.index
		);
	};

	return (
		<TableRow className={classes.NewUser}>
			<TableCell>
				<Input
					type="text"
					value={props.newUser.username}
					touched={!props.newUser.username}
					onChange={
						(event: ChangeEvent<HTMLInputElement>) =>
							updateUsername(event.target.value)} />
			</TableCell>

			<TableCell>
				<Input
					type="text"
					value={props.newUser.firstName}
					touched={!props.newUser.firstName}
					onChange={
						(event: ChangeEvent<HTMLInputElement>) =>
							updateFirstName(event.target.value)} />
			</TableCell>

			<TableCell>
				<Input
					type="text"
					value={props.newUser.lastName}
					touched={!props.newUser.lastName}
					onChange={
						(event: ChangeEvent<HTMLInputElement>) =>
							updateLastName(event.target.value)} />
			</TableCell>

			<TableCell>
				<form ref={emailInput}>
					<Input
						type="email"
						value={props.newUser.email}
						touched={!props.newUser.email}
						required
						onChange={
							(event: ChangeEvent<HTMLInputElement>) =>
								updateEmail(event.target.value)} />
				</form>
			</TableCell>

			<TableCell></TableCell>

			<TableCell>
				<DeleteIcon
					className={classes.deleteIcon}
					stroke="#D69598"
					onClick={() => deleteNewUser(props.index)} />
			</TableCell>
		</TableRow>
	);
};

export default NewUserRow;