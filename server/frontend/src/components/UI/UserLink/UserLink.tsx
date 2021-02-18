import React from "react";

import classes from "./UserLink.module.scss";

import AccountIcon from "../../../assets/svg/account-icons/account-name-icon.svg";

export interface UserLinkProps {
	username: string,
	expanded: boolean,
	openPopup: React.MouseEventHandler<HTMLDivElement>,
	closePopup: React.MouseEventHandler<HTMLDivElement>
}

const UserLink = (props: UserLinkProps) => {
	const cls = [classes.UserLink];
	if (props.expanded) {
		cls.push(classes.userLinkExpanded);
	}

	return (
		<section
			className={cls.join(" ")}
			onMouseEnter={props.openPopup}
			onMouseLeave={props.closePopup} >

			<div data-test-id="userLink" style={{ backgroundImage: `url(${AccountIcon})` }}>
				<p className={classes.clip}>{props.username}</p>
			</div>
		</section>
	);
};
export default UserLink;
