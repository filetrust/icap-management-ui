import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import classes from "./HistoryRow.module.scss";

const HistoryLoadingRow = () => {
	return (
		<TableRow className={classes.HistoryRow}>
			<TableCell colSpan={4} component="th" scope="row">
				Loading...
			</TableCell>
		</TableRow>
	);
};

export default HistoryLoadingRow;