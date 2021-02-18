import React from "react";

import classes from "./SelectedFilter.module.scss";

import ButtonClose from "../ButtonClose/ButtonClose";

export interface SelectedFilterProps {
	id: string,
	filterName: string,
	title: string,
	titleColor?: string,
	remove: () => void,
	disabled?: boolean
}

const SelectedFilter = (props: SelectedFilterProps) => {
	const clsFooter = [classes.footer];

	if (props.filterName === "Risk") {
		clsFooter.push(classes.risk);
	}

	return (
		<div className={classes.SelectedFilter}>
			<div className={classes.header}>
				<h3>{props.filterName}</h3>
				<ButtonClose
					color={"#b6bfc9"}
					externalStyles={classes.buttonClose}
					onButtonClick={() => props.remove({ id: props.id, filterName: props.filterName })}
					disabled={props.disabled} />
			</div>
			<div className={clsFooter.join(" ")}>
				<span style={{ backgroundColor: props.titleColor }}>{props.title}</span>
			</div>
		</div>
	);
};

export default SelectedFilter;
