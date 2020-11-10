import React, { useContext } from "react";
import { FormControl, FormLabel, FormGroup } from "@material-ui/core";

import { GlobalStoreContext } from "../../../../context/globalStore/globalStore-context";

import { TransactionLogFilter } from "../../../../types/TransactionLogFilter";
import Checkbox from "../../../../components/UI/Checkbox/Checkbox";

import classes from "./Filter.module.scss";

export interface FilterProps {
	filter: string,
	checkboxList: TransactionLogFilter[],
	externalStyles: string
}

const Filter = (props: FilterProps) => {
	// @ts-ignore
	const { addFilterCheckbox } = useContext(GlobalStoreContext);

	const handleChange = (selectedCheckbox: TransactionLogFilter) => {
		addFilterCheckbox(selectedCheckbox);
	};

	const checkboxes = props.checkboxList.map((checkbox) => {
			return (
				<Checkbox
					key={checkbox.id}
					label={checkbox.format}
					isChecked={checkbox.isChecked}
					filter={props.filter}
					backgroundColor={checkbox.titleColor}
					onHandleChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
						handleChange({
							value: checkbox.format,
							filter: props.filter,
							id: checkbox.id,
							isChecked: evt.target.checked,
							titleColor: checkbox.titleColor,
							fileTypeEnum: checkbox.fileTypeEnum,
							riskEnum: checkbox.riskEnum
						})
					}
				/>
			);
		}
	);

	return (
		<FormControl
			component="fieldset"
			className={[classes.Filter, props.externalStyles].join(" ")}>
			<FormLabel component="legend">
				{props.filter === "Risk" ? "" : props.filter}
			</FormLabel>
			<FormGroup
				className={classes.formGroup}
				style={{ flexDirection: "row" }}>
				{checkboxes}
			</FormGroup>
		</FormControl>
	);
};

export default Filter;
