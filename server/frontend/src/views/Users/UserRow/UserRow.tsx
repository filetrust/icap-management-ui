import React, { ChangeEvent, useContext, useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";

import { ReactComponent as EditIcon } from "../../../assets/edit-icon.svg";
import { ReactComponent as RevertIcon } from "../../../assets/svg/filters/expand-arrow-grey.svg";
import { ReactComponent as TickIcon } from "../../../assets/tick-icon.svg";
import { ReactComponent as CrossIcon } from "../../../assets/modal-close.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/delete-icon-white.svg";
import Input from "../../../components/UI/Input/Input";
import User from "../../../../../src/common/models/IdentityManagementService/User/User";
import { UserStatus } from "../../../../../src/common/models/enums/UserStatus";
import { UserContext } from "../../../context/user/UserContext";

import classes from "./UserRow.module.scss";

export interface UserRowProps {
	user: User
}

const UserRow = (props: UserRowProps) => {
	const { currentUser, usersHaveChanges, editUser } = useContext(UserContext);

	const [editable, setEditable] = useState(false);

	const updateUsername = (username: string) => {
		editUser({
			...props.user,
			username
		});
	};

	const updateFirstName = (firstName: string) => {
		editUser({
			...props.user,
			firstName
		});
	};

	const updateLastName = (lastName: string) => {
		editUser({
			...props.user,
			lastName
		});
	};

	const revertEdit = () => {
		setEditable(false);
	};

	const deleteUser = () => {
		editUser({
			...props.user,
			deleted: true
		});
		setEditable(false);
	};

	return (
		<TableRow className={`${classes.User} ${props.user.deleted ? classes.deletedRow : ""}`}>
			<TableCell>
				{!editable &&
					<>
						{!props.user.deleted && props.user.id !== currentUser.id &&
							<div className={classes.editIconContainer}>
								<EditIcon
									stroke="#000000"
									className={classes.editIcon}
									onClick={() => setEditable(true)} />
							</div>
						}
						{props.user.username}
					</>
				}

				{editable &&
					<div className={classes.revertIconContainer}>
						{!usersHaveChanges &&
							<RevertIcon className={classes.revertIcon} onClick={() => revertEdit()} />
						}
						<Input
							type="text"
							value={props.user.username}
							onChange={
								(event: ChangeEvent<HTMLInputElement>) =>
									updateUsername(event.target.value)} />
					</div>
				}
			</TableCell>

			<TableCell>
				{!editable &&
					<>{props.user.firstName}</>
				}

				{editable &&
					<Input
						type="text"
						value={props.user.firstName}
						onChange={
							(event: ChangeEvent<HTMLInputElement>) =>
								updateFirstName(event.target.value)} />
				}
			</TableCell>

			<TableCell>
				{!editable &&
					<>{props.user.lastName}</>
				}

				{editable &&
					<Input
						type="text"
						value={props.user.lastName}
						onChange={
							(event: ChangeEvent<HTMLInputElement>) =>
								updateLastName(event.target.value)} />
				}
			</TableCell>

			<TableCell>
				{props.user.email}
			</TableCell>

			<TableCell>
				{props.user.status === UserStatus.Active &&
					<TickIcon className={classes.statusIcon} stroke="#73AE6F" />
				}

				{props.user.status === UserStatus.Deactivated &&
					<CrossIcon className={classes.statusIcon} stroke="#ff7979" />
				}
			</TableCell>

			<TableCell>
				{!props.user.deleted && !props.user.changed && props.user.id !== currentUser.id &&
					<DeleteIcon
						className={classes.deleteIcon}
						stroke="#D69598"
						onClick={() => deleteUser()} />
				}
			</TableCell>
		</TableRow>
	);
};

export default UserRow;