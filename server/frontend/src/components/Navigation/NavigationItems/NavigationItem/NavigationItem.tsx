import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.scss";

export interface NavigationItemProps {
	testId: string,
	path: string,
	icon: string,
	exact: boolean,
	onClick: () => void,
	children: React.ReactChild
}

const NavigationItem = (props: NavigationItemProps) => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink
				to={props.path}
				activeClassName={classes.active}
				exact={props.exact}
				onClick={props.onClick}
				style={{ backgroundImage: `url(${props.icon})` }}>
				{props.children}
			</NavLink>
		</li>
	);
};

export default NavigationItem;
