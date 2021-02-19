import React from "react";

import styles from "./Nav.module.scss";

export interface NavProps {
	expanded: boolean,
	bottom: boolean,
	children?: React.ReactNode
}

export type TNav = NavProps;

const Nav = (props: NavProps) => {
	return (
		<nav className={`${styles.nav} ${props.expanded ? styles.menuExpanded : ""} ${props.bottom ? styles.bottom : ""}`}>
			<div className={styles.scrollContainer}>
				<ul>
					{props.children}
				</ul>
			</div>
		</nav>
	);
};

export { Nav };