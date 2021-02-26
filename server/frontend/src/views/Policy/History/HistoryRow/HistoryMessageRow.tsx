import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import classes from "./HistoryRow.module.scss";

export interface HistoryMessageRowProps {
	message: string
}

const HistoryMessageRow = (props: HistoryMessageRowProps) => {
	return (
		<TableRow className={classes.HistoryRow}>
			<TableCell colSpan={4} component="th" scope="row">
				{props.message}
			</TableCell>
		</TableRow>
	);
};

export default HistoryMessageRow;