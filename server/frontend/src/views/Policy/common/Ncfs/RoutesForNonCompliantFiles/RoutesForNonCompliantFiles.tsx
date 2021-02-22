import React from "react";
import ApiUrl from "../ApiUrl/ApiUrl";

import classes from "./RoutesForNonCompliantFiles.module.scss";

export interface RoutesForNonCompliantFilesProps {
	ncfsRoutingUrl: string,
	changeInput?: (newUrl: string) => void,
	currentPolicyRoutingUrl: string,
	disabled?: boolean
}

const RoutesForNonCompliantFiles = (props: RoutesForNonCompliantFilesProps) => {
	const handleChange = (newUrl: string) => {
		if (props.changeInput) {
			props.changeInput(newUrl);
		}
	};

	return (
		<section className={classes.routes}>
			<div className={classes.table}>
				<ApiUrl
					isChanged={props.currentPolicyRoutingUrl !== props.ncfsRoutingUrl}
					value={props.ncfsRoutingUrl}
					disabled={props.disabled}
					onChangeInputHandler={(event: any) => handleChange(event.target.value)} />

				{!props.disabled &&
					<p className={classes.currentApiUrl}>Current API Url: {props.currentPolicyRoutingUrl}</p>
				}
			</div>
		</section>
	);
};

export default RoutesForNonCompliantFiles;
