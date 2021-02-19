import React from "react";
import classes from "./Tab.module.scss";

export interface TabProps {
	isSelected: boolean,
	children: React.ReactNode,
	externalStyles?: string,
	innnerContentStyles?: string
}

const Tab = (props: TabProps) => {
	if (props.isSelected) {
		return (
			<div className={[classes.Tab, props.externalStyles].join(" ")}>
				<div className={[classes.innerContent, props.innnerContentStyles].join(" ")}>{props.children}</div>
			</div>
		);
	}

	return null;
};

export default Tab;