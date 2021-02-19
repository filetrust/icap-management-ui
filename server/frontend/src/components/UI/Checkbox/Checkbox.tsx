import React from "react";

import { FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";

import classes from "./Checkbox.module.scss";

export interface CheckboxProps {
	id?: string,
	label?: string,
	onHandleChange: React.ChangeEventHandler,
	isChecked?: boolean,
	filter?: string,
	backgroundColor?: string,
	checkboxIcon?: React.ReactNode,
	checkedIcon?: React.ReactNode,
	disabled?: boolean
}

const Checkbox = (props: CheckboxProps) => {
	let formControlLabelClasses = classes.Checkbox;
	if (props.filter === "Risk") {
		formControlLabelClasses = [formControlLabelClasses, classes.risk].join(" ");

		if (props.disabled) {
			formControlLabelClasses = [formControlLabelClasses, classes.disabled].join(" ");
		}
	}

	let checkbox = null;

	if (props.filter === "Risk") {
		checkbox = (
			<MuiCheckbox
				id={props.id}
				disableRipple
				onChange={props.onHandleChange}
				checkedIcon={<span className={classes.icon} />}
				icon={<span className={classes.icon} />}
				disabled={props.disabled} />
		);
	} else {
		checkbox = (
			<MuiCheckbox
				id={props.id}
				disableRipple
				onChange={props.onHandleChange}
				checked={props.isChecked}
				color="primary"
				checkedIcon={props.checkedIcon}
				icon={props.checkboxIcon}
				disabled={props.disabled} />
		);
	}

	return (
		<FormControlLabel
			style={{ background: props.backgroundColor }}
			className={formControlLabelClasses}
			label={props.label}
			labelPlacement={props.filter !== "Risk" ? "start" : "end"}
			control={checkbox}
			disabled={props.disabled} />
	);
};

export default Checkbox;
