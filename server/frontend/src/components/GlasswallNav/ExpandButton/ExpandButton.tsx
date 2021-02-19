import React from "react";

import styles from "./ExpandButton.module.scss";

export interface ExpandButtonProps {
	expanded: boolean,
	clickHandler: () => void
}

const ExpandButton = (props: ExpandButtonProps) => {
	return (
		<button className={`${styles.button}  ${props.expanded ? styles.expanded : ""}`} onClick={() => props.clickHandler()}></button>
	);
};

export { ExpandButton };