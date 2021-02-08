import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/modal-close.svg";

import classes from "./ButtonClose.module.scss";

export interface ButtonCloseProps {
	onButtonClick: React.MouseEventHandler<HTMLButtonElement>,
	externalStyles: string,
	color?: string,
	disabled?: boolean
}

const ButtonClose = (props: ButtonCloseProps) => {
	return (
		<button
			data-test-id="buttonClose"
			type="button"
			onClick={props.onButtonClick}
			className={`${[classes.ButtonClose, props.externalStyles].join(" ")} ${props.disabled ? classes.disabled : ""}`}
			disabled={props.disabled}>
			<CloseIcon />
		</button>
	);
};

export default ButtonClose;
