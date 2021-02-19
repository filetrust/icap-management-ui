import React from "react";
import { Prompt } from "react-router-dom";

export interface UnsavedChangesPromptProps {
	when: boolean,
	message: string
}

const UnsavedChangesPrompt = (props: UnsavedChangesPromptProps) => {
	return (
		<Prompt when={props.when} message={props.message} />
	);
};

export default UnsavedChangesPrompt;