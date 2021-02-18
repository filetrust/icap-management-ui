import React from "react";
import { ContentManagementFlagAction } from "../../../../../src/common/models/enums/ContentManagementFlagAction";
import classes from "./RadioButton.module.scss";

export interface RadioButtonProps {
	block: string,
	buttonName: string,
	buttonId: string,
	position: ContentManagementFlagAction,
	changed: boolean,
	onChangeHandler: () => void,
	disabled?: boolean
}

const RadioButton = (props: RadioButtonProps) => {
	const cls = [classes.button];
	if (props.changed) {
		cls.push(classes.changed);
	}

	return (
		<div className={classes.RadioButton}>
			<span>{props.buttonName}</span>
			<div className={cls.join(" ")}>
				<input
					checked={props.position === ContentManagementFlagAction.Disallow}
					onChange={() =>
						props.onChangeHandler()
					}
					type="radio"
					id={props.buttonId + "disallow"}
					value="0"
					name={props.buttonId + "disallow"}
					tabIndex={-1}
					disabled={props.disabled} />
				<label htmlFor={props.buttonId + "disallow"}>Disallow</label>

				<input
					checked={props.position === ContentManagementFlagAction.Sanitise}
					onChange={() =>
						props.onChangeHandler()
					}
					type="radio"
					id={props.buttonId + "sanitise"}
					value="1"
					name={props.buttonId + "sanitise"}
					tabIndex={-1}
					disabled={props.disabled} />

				<label htmlFor={props.buttonId + "sanitise"}>Sanitise</label>
			</div>
		</div>
	);
};

export default RadioButton;
