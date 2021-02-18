import React, { useEffect } from "react";

import classes from "./Modal.module.scss";

import ButtonClose from "../ButtonClose/ButtonClose";

export interface ModalProps {
	onCloseHandler: () => void,
	children?: React.ReactNode,
	externalStyles?: string
}

const Modal = (props: ModalProps) => {
	const handleEscape = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			props.onCloseHandler();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleEscape);

		return () => {
			window.removeEventListener("keydown", handleEscape);
		};
	});

	return (
		<section className={[classes.Modal, props.externalStyles].join(" ")}>
			<ButtonClose
				externalStyles={classes.buttonClose}
				onButtonClick={props.onCloseHandler} />

			{props.children}

		</section>
	);
};

export default Modal;
