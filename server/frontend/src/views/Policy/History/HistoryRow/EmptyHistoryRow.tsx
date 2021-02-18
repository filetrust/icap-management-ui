import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import classes from "./HistoryRow.module.scss";

const EmptyHistoryRow = () => {
	return (
		<TableRow className={classes.HistoryRow}>
			<TableCell colSpan={4} component="th" scope="row">
				No Previous Policies Were Found.
			</TableCell>
		</TableRow>
	);
};

export default EmptyHistoryRow;