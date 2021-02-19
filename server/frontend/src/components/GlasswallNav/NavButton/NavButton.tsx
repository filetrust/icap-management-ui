import React from "react";
import styles from "./NavButton.module.scss";

export interface NavButtonProps {
	selected: boolean,
	clickHandler?: () => void,
	children?: React.ReactNode
}

const NavButton = (props: NavButtonProps) => {
	return (
		<li>
			<button
				className={`${styles.button} ${props.selected ? styles.selected : ""}`}
				onClick={() => props.clickHandler && props.clickHandler()}>{props.children}
			</button>
		</li>
	);
};

export { NavButton };