import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import classes from "./HistoryRow.module.scss";

import Button from "../../../../components/UI/Button/Button";

export interface HistoryRowProps {
	id: string,
	timestamp: string,
	updatedBy: string,
	isCurrent: boolean,
	activatePreviousPolicyHandler: () => void,
	openPreviousPolicyModalHandler: () => void
}

const HistoryRow = (props: HistoryRowProps) => {
	return (
		<TableRow
			className={classes.HistoryRow + props.isCurrent ? classes.current : ""}
			id={props.id}>
			<TableCell component="th" scope="row" id={props.id}>
				{props.timestamp}
			</TableCell>
			<TableCell component="th" scope="row" id={props.id}>
				{props.updatedBy}
			</TableCell>
			<TableCell component="th" scope="row" id={props.id}>
				<Button
					onButtonClick={props.openPreviousPolicyModalHandler}
					externalStyles="policyHistoryViewButton"
					buttonType="button">
					View
				</Button>
			</TableCell>
			<TableCell component="th" scope="row" id={props.id}>
				<Button
					onButtonClick={props.activatePreviousPolicyHandler}
					disabled={props.isCurrent}
					externalStyles="policyHistoryActivateButton"
					buttonType="button">
					Activate
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default HistoryRow;
