import React from "react";

import styles from "./NavSpacer.module.scss";

const NavSpacer = () => {
	return (
		<li>
			<div className={styles.spacer}></div>
		</li>
	);
};

export { NavSpacer };