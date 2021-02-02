import React, { useState, useContext } from "react";

import classes from "./Toolbar.module.scss";

import { UserContext } from "../../../context/user/UserContext";

import { GlobalStoreContext } from "../../../context/globalStore/globalStore-context";

import GlasswallLogo from "../../GlasswallLogo/GlasswallLogo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { ExpandButton } from "../../GlasswallNav/GlasswallNav";
import UserLink from "../../UI/UserLink/UserLink";
import Popup, { PopupButton } from "../../UI/Popup/Popup";

import dashIcon from "../../../assets/menu-icons/icon-dashboard.svg";
import policy from "../../../assets/menu-icons/icon-policies.svg";
import transactionIcon from "../../../assets/menu-icons/icon-transactions.svg";
import usersIcon from "../../../assets/menu-icons/icon-users.svg";
import logoutIcon from "../../../assets/svg/account-icons/logout-icon.svg";
// import changePassIcon from "../../../assets/svg/account-icons/change-password-icon.svg";
// import ChangePassword from "../../ChangePassword/ChangePassword";

const navLinks = [
	{
		link: "/analytics",
		name: "Analytics",
		icon: dashIcon,
		id: "id-1",
		exact: true,
		testId: "navLinkAnalytics"
	},
	{
		link: "/request-history",
		name: "Request history",
		icon: transactionIcon,
		id: "id-2",
		exact: true,
		testId: "navLinkRequestHistory"
	},
	// {
	// 	link: "/file-drop",
	// 	name: "File drop",
	// 	icon: releaseIcon,
	// 	id: "id-3",
	// 	testId: "navLinkFileDrop"
	// },
	{
		link: "/policy",
		name: "Policy",
		icon: policy,
		id: "id-4",
		testId: "navLinkPolicy"
	},
	{
		link: "/users",
		name: "Users",
		icon: usersIcon,
		id: "id-6",
		testId: "navLinkUsers"
	},
];

const Toolbar = () => {
	const {
		currentUser,
		logout
	} = useContext(UserContext);

	const [userLinkIsOpen, setUserLinkIsOpen] = useState(false);
	// const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] = useState(false);

	// @ts-ignore
	const { version, navExpanded, toggleNavExpanded } = useContext(GlobalStoreContext);

	const cls = [classes.Toolbar];
	if (navExpanded) {
		cls.push(classes.expanded);
	}

	const accountLinks: PopupButton[] = [
		{
			testId: "userLinksButtonLogout",
			name: "Log out",
			icon: logoutIcon,
			onClickButtonHandler: () => logout(),
		}// ,
		// {
		// 	testId: "userLinksButtonChangePassword",
		// 	name: "Change password",
		// 	icon: changePassIcon,
		// 	onClickButtonHandler: () => setChangePasswordModalIsOpen(true),
		// },
	];

	return (
		<>
			<section className={cls.join(" ")}>
				<GlasswallLogo className={classes.logo} />
				<NavigationItems expanded={navExpanded} items={navLinks} />
				<UserLink
					username={currentUser.username}
					expanded={navExpanded}
					openPopup={() => setUserLinkIsOpen(true)}
					closePopup={() => setUserLinkIsOpen(false)}
				/>
				<ExpandButton expanded={navExpanded} clickHandler={toggleNavExpanded} />
				{version !== "" &&
					<span>v{version}</span>
				}
			</section>
			{userLinkIsOpen && (
				<Popup
					popupButtons={accountLinks}
					externalStyles={classes.popup}
					openPopupHover={() => setUserLinkIsOpen(true)}
					closePopupHover={() => setUserLinkIsOpen(false)}
				/>
			)}
			{/* {changePasswordModalIsOpen &&
				<ChangePassword closeModal={() => setChangePasswordModalIsOpen(false)} />
			} */}
		</>
	);
};

export default Toolbar;
