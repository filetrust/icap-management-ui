import React, { useContext } from "react";

import classes from "./RoutesForNonCompliantFiles.module.scss";

import DomainField from "../DomainField/DomainField";
import { PolicyContext } from "../../../context/policy/policy-context";

export interface RoutesForNonCompliantFilesProps {
	ncfsRoutingUrl: string,
	changeInput?: (newUrl: string) => void,
	disabled?: boolean
}

const RoutesForNonCompliantFiles = (props: RoutesForNonCompliantFilesProps) => {
	const { currentPolicy } = useContext(PolicyContext);

	const handleChange = (newUrl: string) => {
		if (props.changeInput) {
			props.changeInput(newUrl);
		}
	}

	return (
		<section className={classes.routes}>
			<div className={classes.table}>
				<DomainField
					value={props.ncfsRoutingUrl}
					disabled={props.disabled}
					onChangeInputHandler={(event: any) => handleChange(event.target.value)}
				/>
			</div>
		</section>
	);
};

export default RoutesForNonCompliantFiles;
