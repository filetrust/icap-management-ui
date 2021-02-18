import React, { useContext } from "react";
import { FormControl, FormLabel, FormGroup } from "@material-ui/core";

import { GlobalStoreContext } from "../../../../context/globalStore/globalStore-context";

import { TransactionLogFilter } from "../../../../types/TransactionLogFilter";
import Checkbox from "../../../../components/UI/Checkbox/Checkbox";

import classes from "./Filter.module.scss";

export interface FilterProps {
	filterName: string,
	checkboxList: TransactionLogFilter[],
	externalStyles: string,
	disabled?: boolean
}

const Filter = (props: FilterProps) => {
	const { addFilterFromCheckbox } = useContext(GlobalStoreContext);

	const handleChange = (selectedCheckbox: TransactionLogFilter) => {
		addFilterFromCheckbox(selectedCheckbox);
	};

	const checkboxes = props.checkboxList.map((checkbox) => {
		return (
			<Checkbox
				key={checkbox.id}
				label={checkbox.title}
				isChecked={checkbox.isChecked}
				filter={props.filterName}
				backgroundColor={checkbox.titleColor}
				disabled={props.disabled}
				onHandleChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
					handleChange({
						title: checkbox.title,
						filterName: props.filterName,
						id: checkbox.id,
						isChecked: evt.target.checked,
						titleColor: checkbox.titleColor,
						fileTypeEnum: checkbox.fileTypeEnum,
						riskEnum: checkbox.riskEnum
					})
				} />
		);
	}
	);

	return (
		<FormControl
			component="fieldset"
			className={[classes.Filter, props.externalStyles].join(" ")}>
			<FormLabel component="legend">
				{props.filterName === "Risk" ? "" : props.filterName}
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
