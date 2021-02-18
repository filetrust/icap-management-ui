import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination } from "@material-ui/core";

import classes from "./Pagination.module.scss";

export interface PaginationProps {
	count: number,
	page: number,
	onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void,
	rowsPerPageOptions: number[],
	rowsPerPage: number,
	onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void,
	disabled?: boolean
}

const useStyles = makeStyles(() => ({
	root: {
		"& > *": {
			justifyContent: "center",
			display: "flex"
		},
		overflow: "hidden"
	},
	spacer: { display: "none" },
	caption: {
		fontSize: "1.4rem",
		fontWeight: 600
	},
	toolbar: {
		color: "#196480",
		fontSize: "1.4rem",
		fontWeight: 600
	},
	menuItem: {
		color: "#196480",
		fontSize: "1.2rem",
		fontWeight: 600
	}
}));

const Pagination = (props: PaginationProps) => {
	const muiClasses = useStyles();

	return (
		<TablePagination
			className={classes.pagination}
			classes={muiClasses}
			component="div"
			count={props.count}
			page={props.page}
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onChangePage={props.disabled ? () => {  } : props.onChangePage}
			rowsPerPage={props.rowsPerPage}
			rowsPerPageOptions={props.rowsPerPageOptions}
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			onChangeRowsPerPage={props.disabled ? () => { } : props.onChangeRowsPerPage} />
	);
};

export default Pagination;
