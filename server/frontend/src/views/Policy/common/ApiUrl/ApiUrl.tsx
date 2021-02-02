import React from "react";

import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";

import classes from "./ApiUrl.module.scss";

import Input from "../../../../components/UI/Input/Input";

export interface ApiUrlProps {
	value: string,
	onChangeInputHandler: (event: any) => void,
	isChanged?: boolean,
	disabled?: boolean
}

const ApiUrl = (props: ApiUrlProps) => {
	return (
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell>API URL</TableCell>
					{/* <TableCell>Validated</TableCell> */}
				</TableRow>
			</TableHead>
			<TableBody className={classes.tbody}>
				<TableRow className={`${classes.domainRow} ${props.disabled ? classes.disabled : ""}`}>
					<TableCell>
						<Input
							testId="inputApiUrl"
							type="text"
							placeholder="API URL"
							touched={props.isChanged}
							onChange={props.onChangeInputHandler}
							disabled={props.disabled}
							value={props.value}
						/>
					</TableCell>
					{/* <TableCell>
						<TickIcon stroke="#73AE6F" />
					</TableCell> */}
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default ApiUrl;
