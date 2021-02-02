import React from "react";
import classes from "./Button.module.scss";

export interface ButtonProps {
	testId?: string,
	onButtonClick?: React.MouseEventHandler<HTMLButtonElement>,
	buttonId?: string,
	buttonType: 'submit' | 'reset' | 'button',
	externalStyles?: string,
	buttonStyle?: React.CSSProperties,
	children: React.ReactNode,
	disabled?: boolean
}

const Button = (props: ButtonProps) => {
	return (
		<button
			data-test-id={props.testId}
			onClick={props.onButtonClick}
			className={[classes.button, props.externalStyles].join(" ")}
			style={props.buttonStyle}
			type={props.buttonType}
			id={props.buttonId}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
